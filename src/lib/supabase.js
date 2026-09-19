import { createClient } from "@supabase/supabase-js";
import { getLessonData } from "../data/pythonCourse/lessonProvider";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const isPlaceholder = (val) =>
  !val ||
  typeof val !== "string" ||
  val.includes("your-project-ref") ||
  val.includes("your-supabase-anon-key") ||
  val.includes("placeholder") ||
  val.includes("example.com");

export const isConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !isPlaceholder(supabaseUrl) &&
  !isPlaceholder(supabaseKey)
);

if (!isConfigured) {
  console.info(
    "[ATP Vault] Supabase environment variables not configured or using placeholders. Running in preview student mode."
  );
}

const PREVIEW_SESSION_KEY = "atp_preview_session_v1";
const PREVIEW_PROGRESS_KEY = "atp_preview_progress_v1";

export function getStoredPreviewUser() {
  try {
    const raw = localStorage.getItem(PREVIEW_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredPreviewUser(user) {
  try {
    if (user) {
      localStorage.setItem(PREVIEW_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(PREVIEW_SESSION_KEY);
    }
  } catch (e) {
    console.warn("Storage warning", e);
  }
}

function createFallbackClient() {
  const queryBuilder = (tableName) => {
    let _selectedColumns = "*";
    let filters = {};

    const builder = {
      select: (cols) => {
        _selectedColumns = cols;
        return builder;
      },
      eq: (col, val) => {
        filters[col] = val;
        return builder;
      },
      order: () => builder,
      limit: () => builder,
      maybeSingle: async () => {
        if (tableName === "entitlements") {
          return {
            data: {
              id: "preview-entitlement-01",
              user_id: "preview-student-101",
              product_id: "atp_complete",
              status: "active",
              created_at: new Date().toISOString()
            },
            error: null
          };
        }
        return { data: null, error: null };
      },
      single: async () => {
        if (tableName === "entitlements") {
          return {
            data: {
              id: "preview-entitlement-01",
              user_id: "preview-student-101",
              product_id: "atp_complete",
              status: "active",
              created_at: new Date().toISOString()
            },
            error: null
          };
        }
        return { data: null, error: null };
      },
      upsert: async (records) => {
        if (tableName === "python_learning_progress") {
          try {
            const raw = localStorage.getItem(PREVIEW_PROGRESS_KEY);
            const list = raw ? JSON.parse(raw) : [];
            const items = Array.isArray(records) ? records : [records];
            for (const item of items) {
              const existingIdx = list.findIndex(p => p.lesson_id === item.lesson_id);
              if (existingIdx >= 0) {
                list[existingIdx] = { ...list[existingIdx], ...item };
              } else {
                list.push(item);
              }
            }
            localStorage.setItem(PREVIEW_PROGRESS_KEY, JSON.stringify(list));
          } catch (e) {
            console.warn("Local progress save warning", e);
          }
        }
        return { data: records, error: null };
      },
      insert: async (records) => ({ data: records, error: null }),
      update: async (records) => ({ data: records, error: null }),
      delete: async () => ({ data: null, error: null }),
      then: (resolve) => {
        if (tableName === "entitlements") {
          resolve({
            data: [
              {
                id: "preview-entitlement-01",
                user_id: "preview-student-101",
                product_id: "atp_complete",
                status: "active",
                created_at: new Date().toISOString()
              }
            ],
            error: null
          });
          return;
        }

        if (tableName === "python_learning_progress") {
          try {
            const raw = localStorage.getItem(PREVIEW_PROGRESS_KEY);
            const list = raw ? JSON.parse(raw) : [];
            resolve({ data: list, error: null });
          } catch {
            resolve({ data: [], error: null });
          }
          return;
        }

        resolve({ data: [], error: null });
      },
      catch: () => Promise.resolve({ data: [], error: null }),
    };

    return new Proxy(builder, {
      get: (target, prop) => {
        if (prop in target) return target[prop];
        if (prop === "then") return target.then;
        if (prop === "catch") return target.catch;
        return () => builder;
      },
    });
  };

  return {
    auth: {
      getUser: async () => {
        const user = getStoredPreviewUser();
        return { data: { user }, error: null };
      },
      getSession: async () => {
        const user = getStoredPreviewUser();
        return {
          data: {
            session: user ? { user, access_token: "preview-jwt-token" } : null
          },
          error: null
        };
      },
      onAuthStateChange: (cb) => {
        const user = getStoredPreviewUser();
        if (user && cb) {
          setTimeout(() => {
            cb("SIGNED_IN", { user, access_token: "preview-jwt-token" });
          }, 0);
        }
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithPassword: async ({ email }) => {
        const previewUser = {
          id: "preview-student-101",
          email: email || "student@preview.atp",
          user_metadata: { name: email ? email.split("@")[0] : "Student" },
          created_at: new Date().toISOString()
        };
        setStoredPreviewUser(previewUser);
        return {
          data: {
            user: previewUser,
            session: { user: previewUser, access_token: "preview-jwt-token" }
          },
          error: null
        };
      },
      signInWithOtp: async ({ email: _email } = {}) => {
        return { data: { message: "Preview OTP sent" }, error: null };
      },
      verifyOtp: async ({ email }) => {
        const previewUser = {
          id: "preview-student-101",
          email: email || "student@preview.atp",
          user_metadata: { name: email ? email.split("@")[0] : "Student" },
          created_at: new Date().toISOString()
        };
        setStoredPreviewUser(previewUser);
        return {
          data: {
            user: previewUser,
            session: { user: previewUser, access_token: "preview-jwt-token" }
          },
          error: null
        };
      },
      signOut: async () => {
        setStoredPreviewUser(null);
        return { error: null };
      },
      signUp: async ({ email, options }) => {
        const name = options?.data?.name || (email ? email.split("@")[0] : "Student");
        const previewUser = {
          id: "preview-student-101",
          email: email || "student@preview.atp",
          user_metadata: { name },
          created_at: new Date().toISOString()
        };
        setStoredPreviewUser(previewUser);
        return {
          data: {
            user: previewUser,
            session: { user: previewUser, access_token: "preview-jwt-token" }
          },
          error: null
        };
      },
    },
    from: (tableName) => queryBuilder(tableName),
    functions: {
      invoke: async (funcName, options = {}) => {
        if (funcName === "get-python-lesson") {
          const lessonId = options?.body?.lesson_id || options?.body?.lessonId;
          const lesson = getLessonData(lessonId);
          if (lesson) {
            return {
              data: { lesson },
              error: null
            };
          }
          return {
            data: null,
            error: new Error(`Lesson '${lessonId}' not found.`)
          };
        }
        if (funcName === "create-payment-order") {
          return {
            data: {
              orderId: "order_preview_" + Math.random().toString(36).substring(2, 9),
              amount: 4900,
              currency: "INR",
              key: "rzp_test_preview"
            },
            error: null
          };
        }
        if (funcName === "register-device" || funcName === "request-device-transfer") {
          return {
            data: { success: true, message: "Preview device registered successfully" },
            error: null
          };
        }
        if (funcName === "issue-device-challenge") {
          return {
            data: { challenge: "preview-challenge-" + Date.now() },
            error: null
          };
        }
        if (funcName === "verify-device-and-start-session" || funcName === "refresh-study-session") {
          return {
            data: {
              sessionToken: "preview-session-token-" + Date.now(),
              expiresAt: new Date(Date.now() + 86400000).toISOString()
            },
            error: null
          };
        }
        if (funcName === "get-free-material-access" || funcName === "get-material-access") {
          return {
            data: {
              accessUrl: "/sample.pdf",
              watermarkText: "PREVIEW STUDENT - KTU UCEST105",
              allowed: true
            },
            error: null
          };
        }
        return {
          data: null,
          error: null
        };
      },
    },
    storage: {
      from: () => ({
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        createSignedUrl: async () => ({
          data: null,
          error: new Error("Storage not configured in preview mode."),
        }),
      }),
    },
  };
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : createFallbackClient();

