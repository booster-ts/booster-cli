module.exports = {
    "rootDir": ".",
    "roots": [
        "<rootDir>/functional"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/tests/.*|(\\.|/)(spec.func))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
};