// Knowledge Base: Maps broad roles/terms to specific related technical skills
const skillOntology = {
    // Web Development Roles
    "full stack": ["react", "node", "express", "mongodb", "mern", "mean", "angular", "vue", "nextjs", "django", "flask", "spring boot", "sql", "nosql", "aws", "docker", "redis", "graphql"],
    "frontend": ["html", "css", "javascript", "react", "angular", "vue", "redux", "typescript", "tailwind", "bootstrap", "figma", "nextjs", "sass", "less", "webpack"],
    "backend": ["node", "express", "java", "python", "django", "flask", "c#", ".net", "php", "laravel", "sql", "mysql", "postgresql", "mongodb", "redis", "aws", "docker", "kubernetes", "go", "golang", "ruby", "rails"],
    
    // Mobile
    "mobile developer": ["react native", "flutter", "android", "ios", "swift", "kotlin", "java", "dart", "xamarin"],
    "android": ["java", "kotlin", "xml", "android studio", "gradle"],
    "ios": ["swift", "objective-c", "xcode", "cocoapods"],

    // Data Science & AI
    "data scientist": ["python", "r", "sql", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch", "machine learning", "deep learning", "tableau", "power bi", "matplotlib", "seaborn", "hadoop", "spark"],
    "machine learning": ["python", "tensorflow", "pytorch", "scikit-learn", "keras", "opencv", "nlp", "computer vision", "reinforcement learning"],
    "data analyst": ["sql", "excel", "python", "tableau", "power bi", "statistics", "r", "sas"],

    // DevOps & Cloud
    "devops": ["aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "ci/cd", "linux", "terraform", "ansible", "bash", "scripting", "prometheus", "grafana", "git"],
    "cloud engineer": ["aws", "azure", "gcp", "terraform", "cloudformation", "linux", "networking"],
    
    // QA
    "qa": ["selenium", "cypress", "jest", "manual testing", "automation", "junit", "mocha", "appium", "postman"],
    
    // Cyber Security
    "cyber security": ["network security", "penetration testing", "ethical hacking", "linux", "python", "cryptography", "firewalls", "siem"],

    // Common Synonyms / Variations (Normalization)
    "js": ["javascript"],
    "ts": ["typescript"],
    "ml": ["machine learning"],
    "ai": ["artificial intelligence"],
    "cpp": ["c++"],
    "dotnet": [".net"],
    "reactjs": ["react"],
    "nodejs": ["node"],
    "expressjs": ["express"],
    "vuejs": ["vue"],
    "angularjs": ["angular"],
    "mongo": ["mongodb"],
    "postgres": ["postgresql"]
};

// Helper function to expand a list of terms into all their related ontology terms
const expandTerms = (terms) => {
    let expanded = new Set(terms);
    terms.forEach(term => {
        // Direct ontology lookup
        if (skillOntology[term]) {
            skillOntology[term].forEach(t => expanded.add(t));
        }
        
        // Check for partial matches in ontology keys (e.g., "full stack developer" matches "full stack")
        Object.keys(skillOntology).forEach(key => {
            if (term.includes(key)) {
                skillOntology[key].forEach(t => expanded.add(t));
            }
        });
    });
    return Array.from(expanded);
};

export const calculateMatchScore = (user, job) => {
    if (!user || !job) return 0;

    const userSkills = user?.profile?.skills?.map(skill => skill.toLowerCase().trim()) || [];
    
    // Collect all job related text to extract keywords
    const jobTitle = job?.title?.toLowerCase() || "";
    const jobDescription = job?.description?.toLowerCase() || "";
    const jobRequirements = job?.requirements?.map(req => req.toLowerCase().trim()) || [];

    // Combine job text for keyword searching
    const jobText = `${jobTitle} ${jobDescription} ${jobRequirements.join(" ")}`;

    if (userSkills.length === 0) return 0;

    // --- ENHANCED MATCHING LOGIC ---

    // 1. Expand Job Requirements using Ontology
    // If job asks for "Full Stack", we also look for "React", "Node", etc. in user skills
    // We treat these inferred skills as valid matches for that requirement.
    
    let weightedScore = 0;
    let totalWeight = 0;

    // Weight Distribution:
    // Requirements: 60%
    // Title Match: 20%
    // Description Keywords: 20%

    // --- A. REQUIREMENTS ANALYSIS (60%) ---
    let requirementMatches = 0;
    
    if (jobRequirements.length > 0) {
        jobRequirements.forEach(req => {
            let isMatched = false;

            // 1. Direct Match
            if (userSkills.some(skill => req.includes(skill) || skill.includes(req))) {
                isMatched = true;
            }

            // 2. Inferred Match (Ontology)
            if (!isMatched) {
                let impliedSkills = [];
                
                // Check exact ontology key match
                if (skillOntology[req]) {
                    impliedSkills = skillOntology[req];
                } else {
                    // Check partial ontology key match
                    Object.keys(skillOntology).forEach(key => {
                        if (req.includes(key)) {
                            impliedSkills = [...impliedSkills, ...skillOntology[key]];
                        }
                    });
                }

                if (impliedSkills.length > 0) {
                     // Check if user has at least one of the component skills
                     const hasComponentSkill = userSkills.some(userSkill => impliedSkills.includes(userSkill));
                     if (hasComponentSkill) {
                         isMatched = true;
                     }
                }
            }
            
            if (isMatched) requirementMatches++;
        });
        
        const reqPercentage = (requirementMatches / jobRequirements.length) * 100;
        weightedScore += reqPercentage * 0.6;
        totalWeight += 0.6;
    } else {
        // If no requirements listed, push weight to Description
    }

    // --- B. TITLE MATCH ANALYSIS (20%) ---
    // Does the user have skills related to the job title?
    let titleMatches = 0;
    let titleKeywords = jobTitle.split(/\s+/).filter(w => w.length > 2); // Simple tokenization
    let matchedTitleKeywords = 0;

    titleKeywords.forEach(keyword => {
        // Check direct skill match
        if (userSkills.some(s => s.includes(keyword))) {
            matchedTitleKeywords++;
        }
        // Check ontology match (e.g. Title: "Frontend Dev", User has "React")
        else {
             Object.keys(skillOntology).forEach(key => {
                 if (keyword.includes(key)) { // e.g. "frontend"
                     const related = skillOntology[key];
                     if (userSkills.some(us => related.includes(us))) {
                         matchedTitleKeywords++;
                     }
                 }
             });
        }
    });
    
    const titleScore = matchedTitleKeywords > 0 ? Math.min((matchedTitleKeywords / Math.max(1, titleKeywords.length)) * 100, 100) : 0;
    // Boost title score if we found at least one strong match because titles are short
    const adjustedTitleScore = matchedTitleKeywords > 0 ? Math.max(titleScore, 50) : 0; 

    weightedScore += adjustedTitleScore * 0.2;
    totalWeight += 0.2;


    // --- C. DESCRIPTION & BROAD MATCH (20% or Remainder) ---
    // General keyword density / relevance
    
    let matchCount = 0;
    const descriptionMatches = new Set();
    
    // 1. Direct Keyword Match in full text
    userSkills.forEach(skill => {
        if (jobText.includes(skill)) {
            descriptionMatches.add(skill);
        }
    });

    // 2. Ontology Match (Reverse)
    Object.keys(skillOntology).forEach(role => {
        if (jobText.includes(role)) {
            const relatedSkills = skillOntology[role];
            relatedSkills.forEach(relSkill => {
                if (userSkills.includes(relSkill)) {
                     descriptionMatches.add(relSkill);
                }
            });
        }
    });

    matchCount = descriptionMatches.size;
    
    // Normalize against user's total skills (are most of my skills relevant?)
    const descriptionScore = Math.min(Math.round((matchCount / Math.max(userSkills.length, 1)) * 100), 100);
    
    // If we had requirements, this is 20%. If not, it's 80% (Title is still 20%).
    const remainingWeight = 1 - totalWeight;
    if (remainingWeight > 0) {
        weightedScore += descriptionScore * remainingWeight;
    }

    return Math.round(weightedScore);
};
