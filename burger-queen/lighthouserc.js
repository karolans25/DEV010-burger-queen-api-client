module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run start:prod",
            url: ["http://localhost:4200"],
            numberOfRuns: 3,
            chromePath: "/bin/google-chrome",
        },
        assert: {
            assertions: {
            "categories:performance": ["error", { minScore: 0.90 }],
            "categories:accessibility": ["error", { minScore: 0.9 }],
            "categories:best-practices": ["error", { minScore: 0.9 }],
            "categories:seo": ["error", { minScore: 0.9 }],
            },
        },
        upload: {
            target: "temporary-public-storage",
        },
    },
};  
