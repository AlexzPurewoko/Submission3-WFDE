import { ActivityInfo, AppManifest } from "../../../../../src/scripts/ui/application/manifest/AppManifest";

const appManifestImpl: AppManifest= {
    homepage: "Activity1Impl",
    mode: "normal", // [ test | normal ]
    testPage: "none",
    activities: new Map<string, ActivityInfo>([
        ["Activity1Impl", {
            activityName: "act-first",
            isRootActivity: true,
            urlBase: "/Activity1Impl"
        }],
        ["Activity2Impl", {
            activityName: "act-two",
            isRootActivity: false,
            urlBase: "/Activity2Impl/{id}"
        }],
        ["Activity3Impl", {
            activityName: "act-three",
            isRootActivity: false,
            urlBase: "/Activity3Impl"
        }],
    ])
} 

export {ActivityInfo, appManifestImpl};