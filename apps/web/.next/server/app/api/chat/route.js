"use strict";
(() => {
var exports = {};
exports.id = 744;
exports.ids = [744];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 2196:
/***/ ((module) => {

module.exports = require("next/dist/compiled/ua-parser-js");

/***/ }),

/***/ 281:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "handlers": () => (/* reexport */ route_namespaceObject),
  "headerHooks": () => (/* reexport */ components_headers),
  "requestAsyncStorage": () => (/* reexport */ request_async_storage.requestAsyncStorage),
  "resolvedPagePath": () => (/* binding */ resolvedPagePath),
  "serverHooks": () => (/* reexport */ hooks_server_context),
  "staticGenerationAsyncStorage": () => (/* reexport */ static_generation_async_storage.staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* reexport */ static_generation_bailout.staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/chat/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "POST": () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(7376);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(139);
// EXTERNAL MODULE: ./node_modules/next/headers.js
var headers = __webpack_require__(5279);
// EXTERNAL MODULE: ./src/lib/prisma.ts + 1 modules
var prisma = __webpack_require__(5329);
;// CONCATENATED MODULE: ./src/app/api/chat/route.ts



const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const FREE_REQUEST_LIMIT = 20;
// Get or create a usage tracker tied to a session cookie
async function getUsageTracker(sessionId) {
    return prisma/* prisma.usageTracker.upsert */._.usageTracker.upsert({
        where: {
            sessionId
        },
        update: {},
        create: {
            sessionId
        }
    });
}
async function POST(req) {
    try {
        const body = await req.json();
        const { prompt , provider ="gpt-5" , mode ="fast" , conversationId  } = body;
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return server.NextResponse.json({
                error: "prompt is required"
            }, {
                status: 400
            });
        }
        if (prompt.length > 8000) {
            return server.NextResponse.json({
                error: "prompt too long"
            }, {
                status: 400
            });
        }
        // Session management
        const cookieStore = (0,headers.cookies)();
        let sessionId = cookieStore.get("cl_session")?.value;
        if (!sessionId) {
            sessionId = crypto.randomUUID();
        }
        // Check usage limit
        const tracker = await getUsageTracker(sessionId);
        if (!tracker.isPremium && tracker.requestCount >= FREE_REQUEST_LIMIT) {
            const res = server.NextResponse.json({
                error: "limit_exceeded",
                message: "Free limit reached"
            }, {
                status: 402
            });
            res.cookies.set("cl_session", sessionId, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });
            return res;
        }
        // Increment counter
        await prisma/* prisma.usageTracker.update */._.usageTracker.update({
            where: {
                sessionId
            },
            data: {
                requestCount: {
                    increment: 1
                }
            }
        });
        // Forward to NestJS backend
        const backendRes = await fetch(`${API_URL}/api/v1/chat/respond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt.trim(),
                provider,
                mode
            }),
            signal: AbortSignal.timeout(30000)
        });
        if (!backendRes.ok) {
            throw new Error(`Backend returned ${backendRes.status}`);
        }
        const data = await backendRes.json();
        const content = data.content ?? data.text ?? data.reply ?? "D\xe9sol\xe9, je n'ai pas pu g\xe9n\xe9rer de r\xe9ponse.";
        // Optionally persist to DB if conversationId is provided
        if (conversationId && typeof conversationId === "string") {
            try {
                await prisma/* prisma.message.createMany */._.message.createMany({
                    data: [
                        {
                            conversationId,
                            role: "user",
                            content: prompt.trim()
                        },
                        {
                            conversationId,
                            role: "assistant",
                            content,
                            model: provider
                        }
                    ]
                });
            } catch  {
            // Non-critical — continue even if DB write fails
            }
        }
        const res = server.NextResponse.json({
            content
        });
        res.cookies.set("cl_session", sessionId, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        });
        return res;
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error("[chat/route] error:", message);
        return server.NextResponse.json({
            error: "internal_error",
            message: "Une erreur est survenue"
        }, {
            status: 500
        });
    }
}

// EXTERNAL MODULE: ./node_modules/next/dist/client/components/static-generation-async-storage.js
var static_generation_async_storage = __webpack_require__(9029);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/hooks-server-context.js
var hooks_server_context = __webpack_require__(4065);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/static-generation-bailout.js
var static_generation_bailout = __webpack_require__(224);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/headers.js
var components_headers = __webpack_require__(5153);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/request-async-storage.js
var request_async_storage = __webpack_require__(2458);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5CMohamed%20ali%5CDesktop%5CCODE%5CchatLine%5Capps%5Cweb%5Csrc%5Capp&appPaths=%2Fapi%2Fchat%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=!

    

    
    const resolvedPagePath = "C:\\Users\\Mohamed ali\\Desktop\\CODE\\chatLine\\apps\\web\\src\\app\\api\\chat\\route.ts"

    
  
    
    
    
    
    
  
    
  

/***/ }),

/***/ 5279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(5153);


/***/ }),

/***/ 5329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "_": () => (/* binding */ prisma)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./src/lib/prisma.ts

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new client_namespaceObject.PrismaClient({
    log:  false ? 0 : [
        "error"
    ]
});
if (false) {}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [359,360], () => (__webpack_exec__(281)));
module.exports = __webpack_exports__;

})();