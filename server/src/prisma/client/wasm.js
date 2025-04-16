
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  isActivated: 'isActivated',
  isAcceptedTerms: 'isAcceptedTerms',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  fingerprint: 'fingerprint',
  ua: 'ua',
  ip: 'ip',
  expiresIn: 'expiresIn',
  createdAt: 'createdAt'
};

exports.Prisma.LogsScalarFieldEnum = {
  id: 'id',
  messsage: 'messsage',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  Logs: 'Logs'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/tigranlevcenko/WebstormProjects/frello_kanban/server/src/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/Users/tigranlevcenko/WebstormProjects/frello_kanban/server/src/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "..",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://root:root@localhost:5432/frello_kanban"
      }
    }
  },
  "inlineSchema": "datasource db {\n  url      = env(\"DATABASE_URL\")\n  provider = \"postgresql\"\n}\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"./client\"\n}\n\nmodel User {\n  id              String    @unique @default(uuid())\n  email           String    @unique\n  password        String\n  isActivated     Boolean   @default(false) @map(\"is_activated\")\n  isAcceptedTerms Boolean   @map(\"is_accepted_terms\")\n  createdAt       DateTime  @default(now()) @map(\"created_at\")\n  updatedAt       DateTime  @default(now()) @map(\"updated_at\")\n  sessions        Session[]\n  logs            Logs[]\n\n  @@map(\"users\")\n}\n\nmodel Session {\n  id          String   @unique @default(uuid())\n  token       String   @unique\n  userId      String   @map(\"user_id\")\n  fingerprint String\n  ua          String\n  ip          String\n  expiresIn   DateTime @default(now()) @map(\"expires_in\")\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map(\"sessions\")\n}\n\nmodel Logs {\n  id       String @unique @default(uuid())\n  messsage String\n  userId   String @map(\"user_id\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  @@map(\"logs\")\n}\n",
  "inlineSchemaHash": "958d76940f3992c2aaaa8c0658e45c81dc8e733ba81dae79088efc2e41be5884",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActivated\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_activated\"},{\"name\":\"isAcceptedTerms\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_accepted_terms\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"logs\",\"kind\":\"object\",\"type\":\"Logs\",\"relationName\":\"LogsToUser\"}],\"dbName\":\"users\"},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"fingerprint\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ua\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresIn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"expires_in\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"}],\"dbName\":\"sessions\"},\"Logs\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"messsage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"LogsToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"logs\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

