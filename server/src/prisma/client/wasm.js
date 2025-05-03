
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

exports.Prisma.UserDeviceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  deviceId: 'deviceId',
  fingerprint: 'fingerprint',
  ip: 'ip',
  userAgent: 'userAgent',
  isTrusted: 'isTrusted',
  createdAt: 'createdAt'
};

exports.Prisma.TwoFactorCodeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  code: 'code',
  expiresIn: 'expiresIn',
  createdAt: 'createdAt'
};

exports.Prisma.ActivationTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  createdAt: 'createdAt',
  expiresIn: 'expiresIn'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  userDeviceId: 'userDeviceId',
  lastActivity: 'lastActivity',
  expiresIn: 'expiresIn',
  createdAt: 'createdAt'
};

exports.Prisma.LogScalarFieldEnum = {
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

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  UserDevice: 'UserDevice',
  TwoFactorCode: 'TwoFactorCode',
  ActivationToken: 'ActivationToken',
  Session: 'Session',
  Log: 'Log'
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
  "inlineSchema": "datasource db {\n  url      = env(\"DATABASE_URL\")\n  provider = \"postgresql\"\n}\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"./client\"\n}\n\nmodel User {\n  id                         String            @id @unique @default(uuid())\n  email                      String            @unique\n  password                   String\n  isActivated                Boolean           @default(false) @map(\"is_activated\")\n  isAcceptedTerms            Boolean           @default(false) @map(\"is_accepted_terms\")\n  createdAt                  DateTime          @default(now()) @map(\"created_at\")\n  updatedAt                  DateTime          @default(now()) @map(\"updated_at\")\n  sessions                   Session[]\n  activationTokens           ActivationToken[]\n  userDevices                UserDevice[]\n  twoFactorVerificationCodes TwoFactorCode[]\n\n  @@map(\"users\")\n}\n\nmodel UserDevice {\n  id          String    @id @unique @default(uuid())\n  userId      String    @map(\"user_id\")\n  deviceId    String    @default(uuid())\n  fingerprint String\n  ip          String\n  userAgent   String\n  isTrusted   Boolean   @default(false)\n  createdAt   DateTime  @default(now())\n  sessions    Session[]\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@unique([userId, deviceId], name: \"user_device_pair\")\n  @@map(\"user_devices\")\n}\n\nmodel TwoFactorCode {\n  id        String   @id @default(uuid())\n  userId    String\n  code      String\n  expiresIn DateTime @default(now()) @map(\"expires_in\")\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map(\"two_factor_codes\")\n}\n\nmodel ActivationToken {\n  id        String   @unique @default(uuid())\n  userId    String   @map(\"user_id\")\n  token     String   @unique\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  expiresIn DateTime @default(now()) @map(\"expires_in\")\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map(\"activation_tokens\")\n}\n\nmodel Session {\n  id           String   @id @unique @default(uuid())\n  token        String   @unique\n  userId       String   @map(\"user_id\")\n  userDeviceId String   @map(\"user_device_id\")\n  lastActivity DateTime @default(now()) @map(\"last_activity\")\n  expiresIn    DateTime @default(now()) @map(\"expires_in\")\n  createdAt    DateTime @default(now()) @map(\"created_at\")\n\n  user       User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  userDevice UserDevice @relation(fields: [userDeviceId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map(\"sessions\")\n}\n\nmodel Log {\n  id        String    @id @unique @default(uuid())\n  messsage  String\n  userId    String    @map(\"user_id\")\n  createdAt DateTime? @default(now()) @map(\"created_at\")\n\n  @@map(\"logs\")\n}\n",
  "inlineSchemaHash": "97b736b5be7033130e301d8a652e985c708676a851fb11b30cc83609ea16aa19",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActivated\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_activated\"},{\"name\":\"isAcceptedTerms\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_accepted_terms\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUser\"},{\"name\":\"activationTokens\",\"kind\":\"object\",\"type\":\"ActivationToken\",\"relationName\":\"ActivationTokenToUser\"},{\"name\":\"userDevices\",\"kind\":\"object\",\"type\":\"UserDevice\",\"relationName\":\"UserToUserDevice\"},{\"name\":\"twoFactorVerificationCodes\",\"kind\":\"object\",\"type\":\"TwoFactorCode\",\"relationName\":\"TwoFactorCodeToUser\"}],\"dbName\":\"users\"},\"UserDevice\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"deviceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fingerprint\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isTrusted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"SessionToUserDevice\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserDevice\"}],\"dbName\":\"user_devices\"},\"TwoFactorCode\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresIn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"expires_in\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TwoFactorCodeToUser\"}],\"dbName\":\"two_factor_codes\"},\"ActivationToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"expiresIn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"expires_in\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ActivationTokenToUser\"}],\"dbName\":\"activation_tokens\"},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"userDeviceId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_device_id\"},{\"name\":\"lastActivity\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"last_activity\"},{\"name\":\"expiresIn\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"expires_in\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SessionToUser\"},{\"name\":\"userDevice\",\"kind\":\"object\",\"type\":\"UserDevice\",\"relationName\":\"SessionToUserDevice\"}],\"dbName\":\"sessions\"},\"Log\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"messsage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"user_id\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"}],\"dbName\":\"logs\"}},\"enums\":{},\"types\":{}}")
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

