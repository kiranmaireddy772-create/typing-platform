export interface CategorizedWords {
  easy: string[];
  medium: string[];
  hard: string[];
}

export const GAME_WORDS: CategorizedWords = {
  easy: [
    "cat", "dog", "book", "tree", "home", "star", "sun", "moon", "fire", "water",
    "wind", "rock", "fish", "bird", "door", "desk", "park", "city", "road", "fast",
    "bold", "cool", "wave", "blue", "gold", "kind", "pure", "hope", "lamp", "ship",
    "farm", "rain", "snow", "warm", "rich", "mind", "play", "time", "word", "song",
    "leaf", "lion", "duck", "ring", "king", "queen", "card", "boat", "coin", "foot",
    "hand", "face", "hair", "milk", "food", "soup", "cake", "ball", "game", "team",
    "goal", "line", "page", "note", "pen", "chair", "room", "wall", "roof", "yard",
    "gate", "path", "lake", "hill", "peak", "bank", "shop", "cash", "sale", "code",
    "data", "file", "byte", "loop", "node", "link", "user", "task", "view", "edit",
    "save", "load", "open", "exit", "test", "bug", "log", "run", "key", "type",
    "font", "css", "html", "web", "app", "site", "icon", "text", "form", "list",
    "grid", "flex", "box", "span", "div", "row", "col", "tag", "api", "url",
    "uri", "dns", "cpu", "ram", "ssd", "usb", "net", "dev", "ops", "git",
    "cli", "sdk", "npm", "json", "yaml", "xml", "sql", "dom", "env", "host",
    "port", "call", "push", "pull", "clone", "fork", "sync", "head", "main", "base",
    "path", "root", "tree", "leaf", "stem", "seed", "crop", "soil", "land", "rock",
  ],
  medium: [
    "keyboard", "computer", "student", "practice", "learning", "challenge",
    "mastery", "accuracy", "progress", "standard", "velocity", "terminal",
    "monitor", "network", "function", "variable", "software", "hardware",
    "spectrum", "platform", "feedback", "routine", "protocol", "scenery",
    "movement", "strategy", "sequence", "language", "instance", "template",
    "algorithm", "component", "developer", "database", "interface", "framework",
    "structure", "parameter", "statement", "condition", "operation", "execution",
    "debugging", "repository", "directory", "filename", "document", "paragraph",
    "reference", "connection", "navigation", "dashboard", "analytics", "responsive",
    "container", "breakpoint", "property", "attribute", "element", "selector",
    "stylesheet", "animation", "transition", "rendering", "hydration", "middleware",
    "endpoint", "controller", "validation", "encryption", "permission", "session",
    "storage", "provider", "dispatch", "subscriber", "observer", "pipeline",
    "compiler", "bundler", "transpiler", "package", "dependency", "module",
    "version", "release", "deployment", "cluster", "service", "gateway",
    "balancer", "registry", "workspace", "workflow", "automate", "benchmark",
    "efficiency", "flexibility", "modularity", "usability", "readability", "simplicity",
    "integrity", "security", "protection", "isolation", "sandbox", "telemetry",
    "metric", "indicator", "threshold", "capacity", "resource", "optimizer",
    "generator", "iterator", "closure", "prototype", "recursion", "promise",
    "callback", "listener", "subscriber", "broadcast", "connection", "middleware",
    "namespace", "directory", "framework", "scaffolding", "environment", "credential",
    "authorize", "signature", "algorithm", "heuristic", "precedence", "identifier",
    "declaration", "definition", "expression", "statement", "assignment", "comparison",
    "arithmetic", "operator", "operand", "evaluator", "interpreter", "virtualizer",
  ],
  hard: [
    "development", "programming", "technology", "application", "information",
    "architecture", "performance", "optimization", "infrastructure", "synchronous",
    "multithreading", "computational", "encapsulation", "polymorphism", "implementation",
    "transformation", "quantification", "authentication", "responsiveness", "customization",
    "reusability", "interoperability", "orchestration", "parallelism", "systematic",
    "asynchronous", "microservice", "virtualization", "containerization", "decentralization",
    "cryptography", "serializability", "compatibility", "maintainability", "extensibility",
    "configurability", "scalability", "vulnerability", "virtualmachine", "refactoring",
    "memoization", "immutability", "concurrency", "thread-safety", "reentrancy",
    "idempotency", "deterministic", "non-deterministic", "monomorphic", "polymorphic",
    "instantiation", "initialization", "deconstruction", "deserialization", "serialization",
    "subclassing", "inheritance", "abstraction", "modularization", "normalization",
    "denormalization", "segmentation", "fragmentation", "defragmentation", "provisioning",
    "observability", "instrumentation", "traceability", "reconciliation", "synchronization",
    "benchmarking", "profiling", "vectorization", "parallelization", "supercomputing",
    "microarchitecture", "semiconductor", "microprocessor", "cryptocurrency", "blockchain",
    "hypervisor", "transcompiler", "bootstrapping", "metaprogramming", "introspection",
    "reflection", "interprocess", "multiplexing", "demultiplexing", "packet-switching",
    "backpropagation", "neuralnetwork", "dimensionality", "classification", "regression",
    "quantization", "regularization", "hyperparameter", "autoencoder", "transformer",
    "attention-mechanism", "tokenization", "lemmatization", "stemming", "disambiguation",
    "linearization", "canonicalization", "obfuscation", "compilation", "interpretation",
    "transpilation", "tree-shaking", "code-splitting", "pre-rendering", "static-generation",
    "incremental-build", "serverless", "edge-computing", "distributed-system", "fault-tolerance",
    "high-availability", "disaster-recovery", "load-balancing", "circuit-breaker", "rate-limiting",
    "message-broker", "event-driven", "command-query", "event-sourcing", "domain-driven",
    "test-driven", "behavior-driven", "continuous-integration", "continuous-delivery", "infrastructure-as-code",
  ],
};

// Clean duplicates automatically upon module load
GAME_WORDS.easy = Array.from(new Set(GAME_WORDS.easy));
GAME_WORDS.medium = Array.from(new Set(GAME_WORDS.medium));
GAME_WORDS.hard = Array.from(new Set(GAME_WORDS.hard));

export function getRandomWord(
  difficulty: "easy" | "medium" | "hard" = "easy",
  excludeWords?: string | string[] | Set<string>
): string {
  const pool = GAME_WORDS[difficulty] || GAME_WORDS.easy;
  let excludeSet: Set<string>;

  if (typeof excludeWords === "string") {
    excludeSet = new Set([excludeWords]);
  } else if (Array.isArray(excludeWords)) {
    excludeSet = new Set(excludeWords);
  } else if (excludeWords instanceof Set) {
    excludeSet = excludeWords;
  } else {
    excludeSet = new Set();
  }

  const available = pool.filter((w) => !excludeSet.has(w));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }

  // Fallback if excludeSet excludes the entire pool
  const fallback = pool.filter((w) => excludeWords !== w);
  return fallback[Math.floor(Math.random() * fallback.length)] || pool[0];
}

export function getRandomWords(
  count: number,
  difficulty: "easy" | "medium" | "hard" = "medium",
  excludeWords?: string[] | Set<string>
): string[] {
  const pool = GAME_WORDS[difficulty] || GAME_WORDS.medium;
  const excludeSet = excludeWords instanceof Set ? excludeWords : new Set(excludeWords || []);

  const available = pool.filter((w) => !excludeSet.has(w));
  const source = available.length >= count ? available : pool;

  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, source.length));
}
