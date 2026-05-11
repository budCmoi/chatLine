"use strict";
(() => {
var exports = {};
exports.id = 3;
exports.ids = [3];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 2196:
/***/ ((module) => {

module.exports = require("next/dist/compiled/ua-parser-js");

/***/ }),

/***/ 8082:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "handlers": () => (/* reexport */ route_namespaceObject),
  "headerHooks": () => (/* reexport */ headers),
  "requestAsyncStorage": () => (/* reexport */ request_async_storage.requestAsyncStorage),
  "resolvedPagePath": () => (/* binding */ resolvedPagePath),
  "serverHooks": () => (/* reexport */ hooks_server_context),
  "staticGenerationAsyncStorage": () => (/* reexport */ static_generation_async_storage.staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* reexport */ static_generation_bailout.staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/conversations/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "GET": () => (GET),
  "POST": () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(7376);
// EXTERNAL MODULE: ./node_modules/next/server.js
var server = __webpack_require__(139);
// EXTERNAL MODULE: ./src/lib/prisma.ts + 1 modules
var prisma = __webpack_require__(5329);
;// CONCATENATED MODULE: ./src/app/api/conversations/route.ts


async function GET(req) {
    const sessionId = req.cookies.get("cl_session")?.value;
    if (!sessionId) {
        return server.NextResponse.json({
            conversations: []
        });
    }
    try {
        const conversations = await prisma/* prisma.conversation.findMany */._.conversation.findMany({
            where: {
                sessionId
            },
            orderBy: {
                updatedAt: "desc"
            },
            take: 50,
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                messages: {
                    orderBy: {
                        createdAt: "asc"
                    },
                    select: {
                        id: true,
                        role: true,
                        content: true,
                        model: true,
                        createdAt: true
                    }
                }
            }
        });
        return server.NextResponse.json({
            conversations
        });
    } catch  {
        return server.NextResponse.json({
            error: "internal_error"
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    const sessionId = req.cookies.get("cl_session")?.value;
    if (!sessionId) {
        return server.NextResponse.json({
            error: "no session"
        }, {
            status: 401
        });
    }
    try {
        const body = await req.json();
        const { title  } = body;
        if (!title || typeof title !== "string") {
            return server.NextResponse.json({
                error: "title is required"
            }, {
                status: 400
            });
        }
        const conversation = await prisma/* prisma.conversation.create */._.conversation.create({
            data: {
                title: title.slice(0, 200),
                sessionId
            }
        });
        return server.NextResponse.json({
            conversation
        });
    } catch  {
        return server.NextResponse.json({
            error: "internal_error"
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
var headers = __webpack_require__(5153);
// EXTERNAL MODULE: ./node_modules/next/dist/client/components/request-async-storage.js
var request_async_storage = __webpack_require__(2458);
;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fconversations%2Froute&pagePath=private-next-app-dir%2Fapi%2Fconversations%2Froute.ts&appDir=C%3A%5CUsers%5CMohamed%20ali%5CDesktop%5CCODE%5CchatLine%5Capps%5Cweb%5Csrc%5Capp&appPaths=%2Fapi%2Fconversations%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=!

    

    
    const resolvedPagePath = "C:\\Users\\Mohamed ali\\Desktop\\CODE\\chatLine\\apps\\web\\src\\app\\api\\conversations\\route.ts"

    
  
    
    
    
    
    
  
    
  

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
var __webpack_exports__ = __webpack_require__.X(0, [359,360], () => (__webpack_exec__(8082)));
module.exports = __webpack_exports__;

})();