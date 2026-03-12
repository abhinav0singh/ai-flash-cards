import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// QUESTION BANK  (88 questions across 3 units)
// ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  // ══ UNIT 1 ══
  {id:1,unit:1,topic:"History of AI",question:"Who coined the term 'Artificial Intelligence' at the Dartmouth Conference (1956)?",options:["Alan Turing","John McCarthy","Marvin Minsky","Claude Shannon"],correctIndex:1,explanation:"John McCarthy coined 'Artificial Intelligence' at the 1956 Dartmouth Summer Research Project — the founding event of AI as a field."},
  {id:2,unit:1,topic:"History of AI",question:"Alan Turing's 1950 paper introduced the 'Imitation Game', now known as:",options:["The Winograd Test","The Turing Test","The Loebner Prize","The Chinese Room"],correctIndex:1,explanation:"In 'Computing Machinery and Intelligence' (1950), Turing proposed the Imitation Game — later called the Turing Test — to evaluate machine intelligence."},
  {id:3,unit:1,topic:"History of AI",question:"Periods of reduced AI funding in the 1970s–80s are commonly called:",options:["The AI Summer","The AI Renaissance","The AI Winter","The Knowledge Era"],correctIndex:2,explanation:"AI Winters were periods of reduced funding due to failure to deliver on hyped expectations, occurring in the mid-1970s and late 1980s."},
  {id:4,unit:1,topic:"History of AI",question:"ELIZA, the early NLP program, was developed at MIT by:",options:["John McCarthy","Herbert Simon","Joseph Weizenbaum","Norbert Wiener"],correctIndex:2,explanation:"ELIZA was created by Joseph Weizenbaum at MIT (1964–1966). It simulated conversation using pattern matching and scripted responses."},
  {id:5,unit:1,topic:"Winograd Schema",question:"The Winograd Schema Challenge tests a machine's ability to perform:",options:["Image recognition","Commonsense reasoning & pronoun disambiguation","Mathematical calculations","Speech synthesis"],correctIndex:1,explanation:"Winograd Schema requires resolving pronoun references that depend on commonsense knowledge, testing real language understanding."},
  {id:6,unit:1,topic:"Winograd Schema",question:"In 'The trophy didn't fit in the suitcase because it was too big', what does 'it' refer to?",options:["The suitcase","The trophy","Both","Neither"],correctIndex:1,explanation:"'It' refers to the trophy — the trophy was too big to fit in the suitcase. This requires commonsense reasoning about physical size."},
  {id:7,unit:1,topic:"Winograd Schema",question:"The Winograd Schema was proposed as a better alternative to the Turing Test by:",options:["Terry Winograd","Hector Levesque","Marvin Minsky","Ray Kurzweil"],correctIndex:1,explanation:"Hector Levesque proposed the Winograd Schema Challenge in 2011 as a more rigorous alternative to the Turing Test."},
  {id:8,unit:1,topic:"Language, Mind & Philosophy",question:"John Searle's 'Chinese Room' argument challenges the claim that:",options:["Computers can compute","A Turing-Test-passing program actually understands language","Neural networks can learn","Robots can navigate physically"],correctIndex:1,explanation:"Searle's Chinese Room argues a system can manipulate symbols (passing Turing Test) without truly understanding or having a mind."},
  {id:9,unit:1,topic:"Language, Mind & Philosophy",question:"Which school of thought argues 'the mind is what the brain does'?",options:["Cartesian Dualism","Searle's Intentionality","Functionalism","Kantian Ethics"],correctIndex:2,explanation:"Functionalists define mental states by their functional roles rather than physical substrate — the mind is what the brain does."},
  {id:10,unit:1,topic:"Language, Mind & Philosophy",question:"In AI, 'deductive reasoning' moves from:",options:["Specific cases to general rules","General rules to specific conclusions","Analogies to new cases","Observations to hypotheses"],correctIndex:1,explanation:"Deductive reasoning applies general rules/premises to reach specific, logically certain conclusions. Inductive goes from specifics to general."},
  {id:11,unit:1,topic:"Intelligent Agents",question:"An agent that selects actions to maximize its performance measure is called:",options:["A reflex agent","A rational agent","A learning agent","A utility agent"],correctIndex:1,explanation:"A rational agent selects actions that maximize its expected performance measure given its percept sequence and built-in knowledge."},
  {id:12,unit:1,topic:"Intelligent Agents",question:"Which agent type maintains an internal world model to handle partial observability?",options:["Simple reflex agent","Model-based reflex agent","Goal-based agent","Utility-based agent"],correctIndex:1,explanation:"A model-based reflex agent maintains an internal state (world model) to handle partially observable environments."},
  {id:13,unit:1,topic:"Intelligent Agents",question:"PEAS stands for:",options:["Performance, Environment, Actuators, Sensors","Process, Execution, Action, Sequence","Percept, Evaluation, Agent, State","Planning, Execution, Analysis, Search"],correctIndex:0,explanation:"PEAS describes an agent's task environment: Performance measure, Environment, Actuators (outputs), and Sensors (inputs)."},
  {id:14,unit:1,topic:"State Space Search",question:"The set of all possible configurations reachable in a problem is called the:",options:["Search tree","State space","Heuristic graph","Solution path"],correctIndex:1,explanation:"The state space is the set of all states reachable from the initial state via any sequence of actions."},
  {id:15,unit:1,topic:"State Space Search",question:"Which is NOT a standard component of state space problem formulation?",options:["Initial state","Actions/operators","Goal test","Heuristic function"],correctIndex:3,explanation:"Standard formulation: initial state, actions, transition model, goal test, path cost. Heuristic is used in informed search — not required."},
  {id:16,unit:1,topic:"State Space Search",question:"A 'complete' search algorithm means it will:",options:["Always find the optimal solution","Find a solution if one exists","Run in polynomial time","Never revisit states"],correctIndex:1,explanation:"Completeness guarantees a solution will be found if one exists. It does not guarantee optimality."},
  {id:17,unit:1,topic:"BFS vs DFS",question:"BFS finds the shortest path (fewest edges) guaranteed when:",options:["All edge costs are equal","The graph is directed","The heuristic is admissible","The graph has cycles"],correctIndex:0,explanation:"BFS finds the shortest path (fewest edges) when all step costs are equal, as it explores level by level."},
  {id:18,unit:1,topic:"BFS vs DFS",question:"DFS uses which data structure for its frontier?",options:["Queue","Priority Queue","Stack","Hash Table"],correctIndex:2,explanation:"DFS uses a LIFO stack (explicitly or via recursion) to always explore the deepest node first."},
  {id:19,unit:1,topic:"BFS vs DFS",question:"Which algorithm requires O(b^d) memory (b = branching factor, d = depth)?",options:["DFS","BFS","Iterative Deepening","Bidirectional Search"],correctIndex:1,explanation:"BFS stores all nodes at the current level, requiring O(b^d) memory. DFS only needs O(b·d) — its key advantage."},
  {id:20,unit:1,topic:"BFS vs DFS",question:"DFS is NOT guaranteed to find a solution when:",options:["Tree with finite depth","Graph with cycles (no cycle detection)","Binary search tree","DAG"],correctIndex:1,explanation:"DFS can loop infinitely in a cyclic graph without cycle detection, making it incomplete in that scenario."},
  {id:21,unit:1,topic:"Heuristic Search",question:"A heuristic h(n) is admissible if:",options:["It overestimates cost to goal","It never overestimates the actual cost to goal","It equals exact path cost","It is consistent"],correctIndex:1,explanation:"An admissible heuristic never overestimates the true cost from n to the goal, guaranteeing A* finds the optimal solution."},
  {id:22,unit:1,topic:"Heuristic Search",question:"Greedy Best-First Search selects nodes based on:",options:["g(n) — cost from start","h(n) — estimated cost to goal","f(n) = g(n) + h(n)","Random selection"],correctIndex:1,explanation:"Greedy Best-First uses only h(n), always expanding the node that appears closest to the goal, ignoring cost already incurred."},
  {id:23,unit:1,topic:"Iterative Deepening",question:"DFID (Depth-First Iterative Deepening) combines the benefits of:",options:["BFS and DFS","A* and Greedy","Hill Climbing and SA","Branch and Bound and BFS"],correctIndex:0,explanation:"DFID combines DFS's low memory O(b·d) with BFS's completeness and optimality, making it the preferred uninformed search."},
  {id:24,unit:1,topic:"Iterative Deepening",question:"When DFID reaches its depth limit without finding a goal, it:",options:["Terminates with failure","Increases depth limit by 1 and restarts","Backtracks indefinitely","Invokes the heuristic"],correctIndex:1,explanation:"DFID increments the depth limit by 1 and restarts DFS from scratch each time the limit is exhausted."},
  {id:25,unit:1,topic:"Hill Climbing",question:"Hill Climbing always moves to the neighbor with:",options:["Lowest cost","Highest heuristic value (steepest ascent)","Most successors","Random heuristic value"],correctIndex:1,explanation:"Steepest Ascent Hill Climbing evaluates all neighbors and moves to the one with the highest heuristic value."},
  {id:26,unit:1,topic:"Hill Climbing",question:"A 'plateau' in Hill Climbing is a region where:",options:["Heuristic increases rapidly","All neighboring states have equal value","The solution is found","Search backtracks"],correctIndex:1,explanation:"A plateau is a flat area where all neighboring nodes have the same evaluation, so Hill Climbing can't determine direction."},
  {id:27,unit:1,topic:"Hill Climbing",question:"The major limitation of basic Hill Climbing is:",options:["It is too slow","It can get stuck at local maxima","It requires too much memory","It can't handle large state spaces"],correctIndex:1,explanation:"Hill Climbing gets trapped at local maxima — states better than all neighbors but not the global maximum — with no escape mechanism."},
  {id:28,unit:1,topic:"Travelling Salesman",question:"TSP asks for:",options:["Shortest path between two cities","Minimum spanning tree","Shortest tour visiting all cities exactly once","Maximum flow in a network"],correctIndex:2,explanation:"TSP seeks the shortest Hamiltonian cycle — visiting every city exactly once and returning to origin, minimizing total distance."},
  {id:29,unit:1,topic:"Travelling Salesman",question:"TSP belongs to which complexity class?",options:["P","NP-easy","NP-hard","Linear"],correctIndex:2,explanation:"TSP is NP-hard — no polynomial-time exact algorithm is known. Brute force requires checking (n-1)!/2 routes."},
  {id:30,unit:1,topic:"Travelling Salesman",question:"For TSP with n cities, the number of possible brute-force routes is:",options:["n!","(n-1)!","(n-1)!/2","2^n"],correctIndex:2,explanation:"Since the tour is a cycle and direction doesn't matter, there are (n-1)!/2 distinct tours for n cities."},
  // ══ UNIT 2 ══
  {id:31,unit:2,topic:"Escaping Local Optima",question:"Which technique escapes local optima by occasionally accepting worse solutions?",options:["Steepest Ascent HC","Simulated Annealing","Greedy BFS","Branch and Bound"],correctIndex:1,explanation:"Simulated Annealing probabilistically accepts moves to worse states (with decreasing probability), allowing escape from local optima."},
  {id:32,unit:2,topic:"Escaping Local Optima",question:"Random restarts help escape local optima by:",options:["Reducing branching factor","Starting from multiple random initial states","Using a better heuristic","Increasing search depth"],correctIndex:1,explanation:"Random restart hill climbing runs multiple times from random initial states, increasing probability of reaching global optimum."},
  {id:33,unit:2,topic:"Random Walk",question:"A Random Walk algorithm selects the next state by:",options:["Always choosing the best neighbor","Randomly choosing among all neighbors","Choosing the worst neighbor","Using a heuristic function"],correctIndex:1,explanation:"Random walk randomly selects the next state from all available neighbors without using evaluation functions."},
  {id:34,unit:2,topic:"Random Walk",question:"Random Walk is guaranteed to find a solution in finite time for:",options:["Directed acyclic graphs only","All finite connected graphs","Only trees","Only planar graphs"],correctIndex:1,explanation:"Random Walk is probabilistically complete — it will eventually reach any reachable state in a finite connected graph."},
  {id:35,unit:2,topic:"Simulated Annealing",question:"In Simulated Annealing, the 'temperature' parameter controls:",options:["Depth of search","Probability of accepting worse solutions","Branching factor","Heuristic estimate"],correctIndex:1,explanation:"High temperature allows freely accepting worse solutions (exploration); as temperature drops, acceptance decreases (exploitation)."},
  {id:36,unit:2,topic:"Simulated Annealing",question:"Simulated Annealing is inspired by:",options:["Crystallization in liquids","Metal annealing (slow cooling of metals)","Electrical conductance","Quantum tunneling"],correctIndex:1,explanation:"SA is inspired by metallurgical annealing — heating a material and slowly cooling it allows atoms to settle into low-energy configurations."},
  {id:37,unit:2,topic:"Simulated Annealing",question:"In SA, a worse solution is accepted with probability:",options:["Always 0","Always 1","e^(ΔE/T) where ΔE is cost change","Randomly 0 or 1"],correctIndex:2,explanation:"SA accepts worse solution (cost increase ΔE) with probability e^(-ΔE/T). As T→0, probability→0, making it increasingly greedy."},
  {id:38,unit:2,topic:"Population-Based Methods",question:"Population-based optimization methods maintain:",options:["A single best solution","A set of candidate solutions simultaneously","A priority queue of nodes","A depth-bounded search tree"],correctIndex:1,explanation:"Population-based methods (GA, PSO) maintain a population of solutions and use collective information to guide search."},
  {id:39,unit:2,topic:"Population-Based Methods",question:"Which is NOT a population-based optimization method?",options:["Genetic Algorithms","Particle Swarm Optimization","Ant Colony Optimization","Simulated Annealing"],correctIndex:3,explanation:"Simulated Annealing operates on a single solution. GA, PSO, and ACO are population-based, maintaining multiple solutions."},
  {id:40,unit:2,topic:"Genetic Algorithms",question:"In a Genetic Algorithm, the fitness function is used to:",options:["Generate random mutations","Evaluate how good each chromosome is","Perform crossover","Select initial population"],correctIndex:1,explanation:"The fitness function evaluates each chromosome's quality, guiding selection so better solutions are more likely to reproduce."},
  {id:41,unit:2,topic:"Genetic Algorithms",question:"The genetic operation combining parts of two parents to create offspring is called:",options:["Mutation","Selection","Crossover (Recombination)","Elitism"],correctIndex:2,explanation:"Crossover exchanges genetic material between two parent chromosomes at crossover points, creating new offspring."},
  {id:42,unit:2,topic:"Genetic Algorithms",question:"Mutation in GA serves the purpose of:",options:["Improving the best solution","Maintaining genetic diversity and preventing premature convergence","Evaluating chromosome fitness","Selecting parent chromosomes"],correctIndex:1,explanation:"Mutation introduces random changes to chromosomes, maintaining diversity and allowing exploration of new search space regions."},
  {id:43,unit:2,topic:"Genetic Algorithms",question:"In GA terminology, a single candidate solution is called a:",options:["Gene","Chromosome/Individual","Population","Generation"],correctIndex:1,explanation:"A chromosome (individual) represents one candidate solution. A gene is one component; a population is the full set of chromosomes."},
  {id:44,unit:2,topic:"Eight Queens Problem",question:"The Eight Queens Problem requires placing 8 queens so that:",options:["All queens are on the same row","No two queens attack each other","Queens form a diagonal line","All queens are in the same column"],correctIndex:1,explanation:"No two queens can share the same row, column, or diagonal. The problem has 92 distinct solutions."},
  {id:45,unit:2,topic:"Eight Queens Problem",question:"As a CSP, the Eight Queens Problem uses which primary constraint?",options:["Each cell can have at most 2 queens","No two queens share the same row, column, or diagonal","Queens must be placed in order","Adjacent cells cannot both have queens"],correctIndex:1,explanation:"Constraints: exactly one queen per row, at most one per column, and no two queens on the same diagonal."},
  {id:46,unit:2,topic:"Eight Queens Problem",question:"The total number of distinct solutions to the 8-Queens Problem is:",options:["12","64","92","8"],correctIndex:2,explanation:"There are exactly 92 distinct solutions. If reflections and rotations count as the same, there are only 12 fundamental solutions."},
  {id:47,unit:2,topic:"Ant Colony Optimization",question:"Ant Colony Optimization is inspired by ants' use of:",options:["Visual landmarks","Pheromone trails","Sound signals","Memory of past paths"],correctIndex:1,explanation:"Ants deposit pheromones on paths; shorter paths accumulate pheromones faster, attracting more ants. ACO simulates this positive feedback."},
  {id:48,unit:2,topic:"Ant Colony Optimization",question:"In ACO, pheromone evaporation is important because it:",options:["Speeds up the algorithm","Prevents convergence to suboptimal solutions","Increases importance of short paths","Eliminates all visited paths"],correctIndex:1,explanation:"Evaporation reduces pheromone levels over time, preventing the algorithm from being locked to suboptimal early solutions."},
  {id:49,unit:2,topic:"Ant Colony Optimization",question:"ACO is most naturally suited for:",options:["Continuous optimization","Graph traversal / combinatorial optimization","Image classification","Sorting algorithms"],correctIndex:1,explanation:"ACO is a metaheuristic for combinatorial optimization, particularly well-suited for graph problems like TSP, routing, and scheduling."},
  {id:50,unit:2,topic:"Applications of TSP",question:"Which real-world application directly uses TSP-like solutions?",options:["Image compression","Circuit board drilling and manufacturing","Database indexing","Neural network training"],correctIndex:1,explanation:"Circuit board manufacturing uses TSP to minimize drill travel distance between holes, reducing production time and cost."},
  {id:51,unit:2,topic:"Applications of TSP",question:"Vehicle Routing Problem (VRP) is a generalization of TSP that additionally considers:",options:["Multiple vehicles with capacity constraints","Only one starting depot","Undirected graphs only","Euclidean distances only"],correctIndex:0,explanation:"VRP generalizes TSP to multiple vehicles with limited capacities, each serving a subset of customers — critical for logistics."},
  {id:52,unit:2,topic:"Branch and Bound",question:"Branch and Bound improves over exhaustive search by:",options:["Using a genetic algorithm","Pruning branches that cannot lead to better solutions","Always exploring deepest node first","Using pheromone trails"],correctIndex:1,explanation:"Branch and Bound prunes subtrees when their lower bound exceeds the current best known solution, dramatically reducing search space."},
  {id:53,unit:2,topic:"Branch and Bound",question:"In Branch and Bound, the 'bound' refers to:",options:["Maximum depth allowed","Lower bound on optimal solution cost for the subproblem","The branching factor","Number of nodes expanded"],correctIndex:1,explanation:"The bound is a lower bound on the best possible solution reachable from a node. If worse than current best, the subtree is pruned."},
  {id:54,unit:2,topic:"Branch and Bound",question:"Branch and Bound guarantees finding:",options:["A solution quickly but not optimally","The optimal solution (given an accurate bound)","A solution using O(n) memory","Solution in polynomial time for NP-hard problems"],correctIndex:1,explanation:"Branch and Bound finds the globally optimal solution by systematically eliminating suboptimal subtrees with accurate bounds."},
  {id:55,unit:2,topic:"A* Algorithm",question:"In A*, g(n) represents:",options:["Estimated cost to the goal","Actual cost from start to node n","Total path cost","Branching factor"],correctIndex:1,explanation:"g(n) is the actual accumulated cost from the start node to n, while h(n) estimates the cost from n to the goal."},
  {id:56,unit:2,topic:"A* Algorithm",question:"A* is complete and optimal when h(n) is:",options:["Always 0","Admissible (never overestimates)","Always equal to g(n)","Consistent and overestimates"],correctIndex:1,explanation:"A* finds optimal solution if h(n) is admissible. For graph search with repeated states, consistency is also required."},
  {id:57,unit:2,topic:"A* Algorithm",question:"Which heuristic for the 8-puzzle is admissible?",options:["Number of moves made so far","Euclidean distance of tiles from goal","Manhattan distance of tiles from goal","Tiles out of place × 3"],correctIndex:2,explanation:"Manhattan distance counts moves needed if tiles could move through each other — never overestimates, making it admissible."},
  {id:58,unit:2,topic:"Heuristic Functions",question:"A heuristic is 'consistent' (monotone) if for every node n and successor n':",options:["h(n) <= h(n') + c(n,n')","h(n) >= g(n)","h(n) = 0 for all n","h(n) overestimates cost"],correctIndex:0,explanation:"Consistent heuristic satisfies the triangle inequality: h(n) <= c(n,n') + h(n'). Consistency implies admissibility."},
  {id:59,unit:2,topic:"Heuristic Functions",question:"Informed search strategies use problem-specific knowledge in the form of:",options:["Depth limits","Heuristic functions","Random restarts","Pheromone trails"],correctIndex:1,explanation:"Informed (heuristic) search uses domain-specific heuristic functions to estimate goal cost, guiding search more efficiently."},
  {id:60,unit:2,topic:"Emergent Systems",question:"Emergence in AI refers to the phenomenon where:",options:["A single agent solves complex problems","Complex global behaviors arise from simple local interactions","Systems fail due to complexity","Only one algorithm is used"],correctIndex:1,explanation:"Emergence describes how intelligent-seeming complex behaviors arise from simple rules followed by individual agents."},
  {id:61,unit:2,topic:"Emergent Systems",question:"Swarm Intelligence is studied in systems like:",options:["Expert systems","Ant colonies and bird flocking (Boids)","Neural networks","Decision trees"],correctIndex:1,explanation:"Swarm Intelligence studies collective behavior from decentralized self-organized systems — classic examples: ant colonies and Boids."},
  // ══ UNIT 3 ══
  {id:62,unit:3,topic:"Admissibility of A*",question:"A* finds the optimal solution if h(n) is admissible AND:",options:["g(n) = 0","No repeated states are generated","State space is finite","Search is tree-based OR heuristic is also consistent"],correctIndex:3,explanation:"For tree search, admissibility alone guarantees optimality. For graph search with duplicate detection, consistency is also required."},
  {id:63,unit:3,topic:"Admissibility of A*",question:"If h1(n) <= h2(n) for all n, and both are admissible, which leads to fewer nodes expanded?",options:["h1 (lower estimate)","h2 (higher, more informed estimate)","Both expand the same nodes","Depends on the graph"],correctIndex:1,explanation:"A more informed heuristic (h2) dominates h1 and leads to fewer expansions while remaining admissible."},
  {id:64,unit:3,topic:"Admissibility of A*",question:"A* is optimally efficient among all algorithms using the same heuristic h, meaning:",options:["It expands the minimum number of nodes","It uses the least memory","It finds solutions fastest on average","It has the simplest implementation"],correctIndex:0,explanation:"A* expands no node with f(n) < f*(optimal cost). No other algorithm with the same admissible heuristic can guarantee fewer expansions."},
  {id:65,unit:3,topic:"Iterative Deepening A*",question:"IDA* uses a cutoff based on:",options:["Depth d","f(n) = g(n) + h(n) value","Branching factor b","Random threshold"],correctIndex:1,explanation:"IDA* performs DFS but cuts off when f(n) exceeds the current threshold, initialized to h(start) and increasing each iteration."},
  {id:66,unit:3,topic:"Iterative Deepening A*",question:"IDA*'s primary advantage over A* is:",options:["Always finds solutions faster","Requires O(bd) linear memory instead of exponential","Doesn't need a heuristic","Explores nodes in random order"],correctIndex:1,explanation:"IDA* uses O(bd) memory (linear in depth), compared to A*'s exponential memory — making IDA* practical for large state spaces."},
  {id:67,unit:3,topic:"Iterative Deepening A*",question:"IDA* is complete and optimal when:",options:["The graph has no cycles","The heuristic is admissible","Branching factor is 2","All edge costs are 1"],correctIndex:1,explanation:"Like A*, IDA* finds the optimal solution when the heuristic is admissible. It is complete for finite graphs."},
  {id:68,unit:3,topic:"IDA Pros and Cons",question:"A major disadvantage of IDA* compared to A* is:",options:["IDA* is not optimal","IDA* uses more memory","IDA* may re-expand nodes many times across iterations","IDA* requires a consistent heuristic"],correctIndex:2,explanation:"IDA* re-expands nodes in each iteration (no visited-node storage), leading to redundant work — significant with many distinct f-values."},
  {id:69,unit:3,topic:"IDA Pros and Cons",question:"IDA* is particularly well-suited for problems with:",options:["Large state spaces with expensive memory","Small and well-defined state spaces","Continuous action spaces","Many repeated states"],correctIndex:0,explanation:"IDA* shines when the state space is too large for A*'s memory, trading re-computation for dramatically reduced memory usage."},
  {id:70,unit:3,topic:"Board Games & Game Trees",question:"In a two-player game tree, the two players are called:",options:["Attacker and Defender","MAX and MIN","First and Second","Agent and Environment"],correctIndex:1,explanation:"MAX tries to maximize the evaluation score (the AI); MIN tries to minimize it (the opponent)."},
  {id:71,unit:3,topic:"Board Games & Game Trees",question:"The depth of a game tree is primarily limited by:",options:["Number of legal moves","Computational resources (time/memory)","Board size","Number of players"],correctIndex:1,explanation:"Game trees for complex games have astronomical breadth and depth; search depth is practically limited by computational resources."},
  {id:72,unit:3,topic:"Board Games & Game Trees",question:"A terminal node in a game tree represents:",options:["A node at maximum depth","A won, lost, or drawn game state","A node with the highest branching factor","An intermediate board position"],correctIndex:1,explanation:"Terminal nodes are game-over states (win, loss, draw) at which utility/payoff is directly assigned without further search."},
  {id:73,unit:3,topic:"Minimax Algorithm",question:"The Minimax algorithm assumes the opponent plays:",options:["Randomly","Optimally (best possible move)","Only aggressive moves","Using the same heuristic"],correctIndex:1,explanation:"Minimax assumes an adversary playing optimally — always choosing the move that minimizes MAX's score, guaranteeing best achievable outcome."},
  {id:74,unit:3,topic:"Minimax Algorithm",question:"Time complexity of Minimax with branching factor b and depth d is:",options:["O(b + d)","O(b x d)","O(b^d)","O(d^b)"],correctIndex:2,explanation:"Minimax explores every node in the game tree, giving O(b^d). For chess (b~35, d~100), this is infeasible without pruning."},
  {id:75,unit:3,topic:"Minimax Algorithm",question:"At a MIN node in Minimax, the algorithm selects the child with:",options:["Maximum value","Minimum value","Average value","Random value"],correctIndex:1,explanation:"MIN nodes select minimum-valued child (opponent minimizes MAX's score); MAX nodes select maximum-valued child."},
  {id:76,unit:3,topic:"Alpha-Beta Algorithm",question:"Alpha-Beta pruning eliminates branches that:",options:["Have low branching factor","Cannot possibly influence the final Minimax decision","Are at even depth levels","Have negative evaluation values"],correctIndex:1,explanation:"Alpha-Beta prunes subtrees that can't affect the final decision — branches where the current player already has a better option elsewhere."},
  {id:77,unit:3,topic:"Alpha-Beta Algorithm",question:"The alpha value in Alpha-Beta represents:",options:["Best value MIN can achieve","Best value (highest) MAX has found so far","Average of all sibling values","The depth cutoff"],correctIndex:1,explanation:"Alpha is the best (highest) value MAX has found so far. Beta is the best (lowest) for MIN. Pruning occurs when alpha >= beta."},
  {id:78,unit:3,topic:"Alpha-Beta Algorithm",question:"With optimal move ordering, Alpha-Beta reduces the effective branching factor from b to approximately:",options:["b","b/2","sqrt(b)","log(b)"],correctIndex:2,explanation:"With perfect ordering, Alpha-Beta reduces effective branching factor to sqrt(b), allowing search to go twice as deep as plain Minimax."},
  {id:79,unit:3,topic:"Alpha-Beta Algorithm",question:"A beta cutoff at a MAX node occurs when:",options:["Node value > alpha","Node value >= beta","Node value < alpha","Depth limit is reached"],correctIndex:1,explanation:"At a MAX node, if current value >= beta (MIN's best), MIN will avoid this branch — so we prune remaining children."},
  {id:80,unit:3,topic:"Go and Backgammon",question:"Why was Go far more challenging than Chess for AI for decades?",options:["It has more complex rules","Its branching factor (~250) defeated traditional tree search","It requires more memory","It uses non-standard boards"],correctIndex:1,explanation:"Go's massive branching factor (~250 vs chess's ~35) and need for pattern recognition proved extremely difficult for classical Minimax/Alpha-Beta."},
  {id:81,unit:3,topic:"Go and Backgammon",question:"DeepMind's AlphaGo defeated top human Go players using:",options:["Pure Minimax with deep cutoffs","Monte Carlo Tree Search + Deep Neural Networks","Genetic Algorithms","Alpha-Beta with endgame databases"],correctIndex:1,explanation:"AlphaGo combined MCTS with deep convolutional neural networks for policy (move selection) and value estimation."},
  {id:82,unit:3,topic:"Go and Backgammon",question:"Backgammon introduces randomness into game-playing because of:",options:["Hidden information","Dice rolls (stochastic elements)","Multiple players","Infinite board size"],correctIndex:1,explanation:"Backgammon's dice rolls make it stochastic. Expectiminimax (Minimax with chance nodes) is used to handle this randomness."},
  {id:83,unit:3,topic:"Types of Game Playing",question:"Chess, Go, and Checkers are classified as games that are:",options:["Stochastic and partially observable","Deterministic, fully observable, and zero-sum","Random and cooperative","Continuous action space games"],correctIndex:1,explanation:"These are deterministic (no chance), fully observable (both see complete board), and zero-sum (one player's gain = other's loss)."},
  {id:84,unit:3,topic:"Types of Game Playing",question:"Poker is classified as a game of:",options:["Perfect information","Imperfect information (partially observable)","Complete randomness","Zero branching factor"],correctIndex:1,explanation:"Poker is imperfect information — players cannot see opponents' cards, requiring fundamentally different algorithms."},
  {id:85,unit:3,topic:"Types of Game Playing",question:"An evaluation function in game playing is used to:",options:["Determine legal moves","Estimate value of a non-terminal game state","Record game history","Detect illegal moves"],correctIndex:1,explanation:"Since we can't search to terminal nodes in complex games, evaluation functions (e.g., material count in chess) estimate intermediate positions."},
  {id:86,unit:3,topic:"Applications of Search",question:"Route planning in GPS navigation primarily uses:",options:["DFS","Minimax","Dijkstra's / A*","Genetic Algorithms"],correctIndex:2,explanation:"GPS route planning uses Dijkstra's or A* (with heuristics like straight-line distance) to find shortest/fastest routes efficiently."},
  {id:87,unit:3,topic:"Applications of Search",question:"NLP tasks like machine translation use search algorithms to:",options:["Parse images","Find the most probable sequence of words (decoding)","Route network packets","Sort database records"],correctIndex:1,explanation:"Beam search (a heuristic search variant) is widely used in machine translation and text generation to find high-probability output sequences."},
  {id:88,unit:3,topic:"Applications of Search",question:"Automated planning in robotics (e.g., robot arm motion) is fundamentally a:",options:["Classification problem","State space search problem","Clustering problem","Regression problem"],correctIndex:1,explanation:"Robot motion planning involves finding a sequence of actions from an initial configuration to a goal — a state space search problem."},
];

// ─────────── Leitner logic ───────────
const LEVEL_WEIGHTS = { 1: 8, 2: 4, 3: 2, 4: 1 };
const MAX_LEVEL = 4;

function pickNext(filteredQs, buckets, excludeId) {
  const pool = [];
  filteredQs.forEach(q => {
    const w = LEVEL_WEIGHTS[buckets[q.id] ?? 1];
    for (let i = 0; i < w; i++) pool.push(q.id);
  });
  if (!pool.length) return filteredQs[0]?.id;
  const alt = pool.filter(id => id !== excludeId);
  const src = alt.length > 0 ? alt : pool;
  return src[Math.floor(Math.random() * src.length)];
}

function darken(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - 55);
  const g = Math.max(0, ((n >> 8) & 0xff) - 55);
  const b = Math.max(0, (n & 0xff) - 55);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const UNIT_COLORS = { 1: "#3B9DE8", 2: "#E87B3B", 3: "#9B59B6" };
const CONF_COLS = ["#F7D51D", "#E8381A", "#58B94E", "#3B9DE8", "#FF69B4", "#FF8C00"];

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: `${(i * 37) % 100}%`, top: "-12px",
          width: "10px", height: "10px",
          background: CONF_COLS[i % CONF_COLS.length],
          outline: "2px solid #1a1a2e",
          animation: `pixFall ${1.2 + Math.random() * 0.9}s ${i * 0.06}s linear forwards`,
        }} />
      ))}
    </div>
  );
}

function PixelBtn({ children, onClick, disabled, color = "#3B9DE8", full = false, small = false }) {
  const [dn, setDn] = useState(false);
  const bg = disabled ? "#666" : color;
  const sh = disabled ? "#444" : darken(color);
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseDown={() => !disabled && setDn(true)}
      onMouseUp={() => setDn(false)}
      onMouseLeave={() => setDn(false)}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: small ? "11px" : "13px",
        color: "white", background: bg,
        border: "none", outline: "3px solid #1a1a2e",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: small ? "9px 12px" : "13px 20px",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
        width: full ? "100%" : undefined,
        transform: dn ? "translateY(3px)" : "none",
        boxShadow: dn ? `0 0 0 0 ${sh}` : `0 4px 0 ${sh}, 3px 7px 0 #1a1a2e`,
        transition: "transform 0.05s, box-shadow 0.05s",
        userSelect: "none",
      }}
    >{children}</button>
  );
}

function Panel({ children, bg = "#FFFFFF", style = {} }) {
  return (
    <div style={{
      background: bg, border: "4px solid #1a1a2e",
      boxShadow: "5px 5px 0 #1a1a2e",
      padding: "18px", position: "relative", ...style,
    }}>{children}</div>
  );
}

function Cloud({ style }) {
  return (
    <svg width="72" height="36" viewBox="0 0 72 36" style={{ imageRendering: "pixelated", ...style }}>
      <rect x="18" y="18" width="36" height="14" fill="white" />
      <rect x="10" y="22" width="52" height="10" fill="white" />
      <rect x="26" y="10" width="22" height="12" fill="white" />
      <rect x="32" y="4" width="12" height="8" fill="white" />
    </svg>
  );
}

function Star({ x, y, size = 14, color = "#F7D51D" }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      <svg width={size} height={size} viewBox="0 0 12 12" style={{ imageRendering: "pixelated" }}>
        <rect x="5" y="0" width="2" height="2" fill={color} />
        <rect x="5" y="10" width="2" height="2" fill={color} />
        <rect x="0" y="5" width="2" height="2" fill={color} />
        <rect x="10" y="5" width="2" height="2" fill={color} />
        <rect x="4" y="2" width="4" height="8" fill={color} />
        <rect x="2" y="4" width="8" height="4" fill={color} />
      </svg>
    </div>
  );
}

export default function App() {
  const [buckets, setBuckets] = useState(() =>
    Object.fromEntries(QUESTIONS.map(q => [q.id, 1]))
  );
  const [wrongIds, setWrongIds] = useState(() => new Set());
  const [currentId, setCurrentId] = useState(QUESTIONS[0].id);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0 });
  const [view, setView] = useState("study");
  const [unitFilter, setUnitFilter] = useState(0);
  const timer = useRef(null);

  const filteredQs = unitFilter === 0 ? QUESTIONS : QUESTIONS.filter(q => q.unit === unitFilter);
  const currentQ = QUESTIONS.find(q => q.id === currentId);

  useEffect(() => {
    const ids = new Set(filteredQs.map(q => q.id));
    if (!ids.has(currentId)) {
      setCurrentId(pickNext(filteredQs, buckets, null));
      setSelected(null);
      setAnswered(false);
    }
  }, [unitFilter]);

  const masteryPct = Math.round(
    (Object.values(buckets).reduce((s, l) => s + l, 0) / QUESTIONS.length - 1) / (MAX_LEVEL - 1) * 100
  );
  const lvlCounts = [1, 2, 3, 4].map(l => Object.values(buckets).filter(v => v === l).length);

  function handleAnswer(idx) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const ok = idx === currentQ.correctIndex;
    setStats(s => ({ correct: s.correct + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1), total: s.total + 1 }));
    setBuckets(prev => ({ ...prev, [currentId]: ok ? Math.min((prev[currentId] ?? 1) + 1, MAX_LEVEL) : 1 }));
    if (ok) {
      setStreak(s => s + 1);
      setConfetti(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setConfetti(false), 2000);
    } else {
      setStreak(0);
      setWrongIds(prev => new Set([...prev, currentId]));
    }
  }

  function nextCard() {
    setCurrentId(pickNext(filteredQs, buckets, currentId));
    setSelected(null);
    setAnswered(false);
  }

  function resetAll() {
    setBuckets(Object.fromEntries(QUESTIONS.map(q => [q.id, 1])));
    setWrongIds(new Set());
    setStreak(0);
    setStats({ correct: 0, wrong: 0, total: 0 });
    setCurrentId(QUESTIONS[0].id);
    setSelected(null);
    setAnswered(false);
    setView("study");
    setUnitFilter(0);
  }

  const wrongQList = QUESTIONS.filter(q => wrongIds.has(q.id));

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#5BA4CF 0%,#87CEEB 35%,#AEE0F5 65%,#C8EDA0 100%)",
      fontFamily: "'Press Start 2P', monospace",
      position: "relative", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes pixFall { to { transform:translateY(110vh) rotate(360deg); opacity:0; } }
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes popIn   { 0%{transform:scale(.85);opacity:0} 70%{transform:scale(1.03)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideR  { from{transform:translateX(-16px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes blinkA  { 0%,100%{opacity:1} 50%{opacity:0} }
        .float  { animation:floatY 3.2s ease-in-out infinite; }
        .pop    { animation:popIn .28s ease-out forwards; }
        .slideR { animation:slideR .22s ease-out forwards; }
        .opt { transition:transform .08s; cursor:pointer; }
        .opt:hover:not(.disabled) { transform:translateX(8px); }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#3a7aad}
        ::-webkit-scrollbar-thumb{background:#F7D51D;border:2px solid #1a1a2e}
      `}</style>

      <Confetti active={confetti} />

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, pointerEvents: "none", zIndex: 0 }}>
        <Cloud style={{ position: "absolute", top: "10px", left: "4%" }} />
        <Cloud style={{ position: "absolute", top: "4px", left: "28%", transform: "scale(1.35)" }} />
        <Cloud style={{ position: "absolute", top: "16px", right: "6%", transform: "scale(.85)" }} />
        <Star x="14%" y="75px" size={14} />
        <Star x="72%" y="55px" size={18} />
        <Star x="88%" y="105px" size={12} />
        <Star x="5%" y="135px" size={10} />
        <Star x="55%" y="30px" size={10} color="#FFC0CB" />
      </div>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "16px 14px 80px", position: "relative", zIndex: 1 }}>

        {/* Title */}
        <div className="float" style={{ textAlign: "center", marginBottom: "18px", paddingTop: "14px" }}>
          <div style={{ fontSize: "15px", color: "white", textShadow: "3px 3px 0 #1a1a2e,-1px -1px 0 #1a1a2e", letterSpacing: "3px" }}>
            ★ AI STUDY QUEST ★
          </div>
          <div style={{ fontSize: "10px", color: "#D8F5A0", textShadow: "2px 2px 0 #1a1a2e", marginTop: "5px" }}>
            ARTIFICIAL INTELLIGENCE (22AD42) · 88 QUESTIONS
          </div>
        </div>

        {/* Mastery bar */}
        <Panel bg="#1a1a2e" style={{ marginBottom: "12px", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
            <span style={{ fontSize: "11px", color: "#F7D51D" }}>OVERALL MASTERY</span>
            <span style={{ fontSize: "12px", color: "#F7D51D" }}>{masteryPct}%</span>
          </div>
          <div style={{ height: "12px", background: "#333", border: "2px solid #555" }}>
            <div style={{
              height: "100%", width: `${masteryPct}%`,
              background: "linear-gradient(90deg,#E8381A 0%,#F7D51D 40%,#58B94E 100%)",
              transition: "width .5s steps(10)",
            }} />
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
            {[{ l: 1, label: "NEW", c: "#E8381A" }, { l: 2, label: "LV2", c: "#E87B3B" }, { l: 3, label: "LV3", c: "#F7D51D" }, { l: 4, label: "MAX", c: "#58B94E" }].map(({ l, label, c }) => (
              <div key={l} style={{ flex: 1, textAlign: "center", background: "#222", border: `2px solid ${c}`, padding: "6px 2px" }}>
                <div style={{ fontSize: "14px", color: c }}>{lvlCounts[l - 1]}</div>
                <div style={{ fontSize: "9px", color: "#777", marginTop: "3px" }}>{label}</div>
              </div>
            ))}
          </div>
          {streak >= 3 && (
            <div style={{ marginTop: "8px", textAlign: "center", fontSize: "11px", color: "#F7D51D", animation: "blinkA .8s infinite" }}>
              🔥 {streak}x STREAK!
            </div>
          )}
        </Panel>

        {/* Nav tabs */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
          {[
            { v: "study", label: "▶ STUDY", color: "#3B9DE8" },
            { v: "wrong", label: `✗ WRONG (${wrongIds.size})`, color: "#E8381A" },
            { v: "stats", label: "◈ STATS", color: "#58B94E" },
          ].map(({ v, label, color }) => (
            <PixelBtn key={v} small color={view === v ? color : "#555"} onClick={() => setView(v)}>
              {label}
            </PixelBtn>
          ))}
          <PixelBtn small color="#9B59B6" onClick={resetAll}>↺</PixelBtn>
        </div>

        {/* Unit filter */}
        {view === "study" && (
          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {[{ v: 0, label: "ALL" }, { v: 1, label: "UNIT 1" }, { v: 2, label: "UNIT 2" }, { v: 3, label: "UNIT 3" }].map(({ v, label }) => (
              <PixelBtn key={v} small color={unitFilter === v ? (UNIT_COLORS[v] ?? "#9B59B6") : "#2D5016"} onClick={() => setUnitFilter(v)}>
                {label}
              </PixelBtn>
            ))}
          </div>
        )}

        {/* ── STUDY VIEW ── */}
        {view === "study" && currentQ && (
          <div className="pop" key={currentId}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ fontSize: "10px", color: "white", background: UNIT_COLORS[currentQ.unit], border: "2px solid #1a1a2e", padding: "5px 9px", boxShadow: "2px 2px 0 #1a1a2e" }}>
                UNIT {currentQ.unit} — {currentQ.topic.toUpperCase().slice(0, 22)}
              </div>
              <div style={{ fontSize: "10px", color: "#1a1a2e", background: "#F7D51D", border: "2px solid #1a1a2e", padding: "5px 9px", boxShadow: "2px 2px 0 #1a1a2e" }}>
                LV.{buckets[currentId]} · #{currentQ.id}/88
              </div>
            </div>

            <Panel bg="#E8F4FD" style={{ marginBottom: "10px" }}>
              <div style={{ fontSize: "10px", color: "#7A7A7A", marginBottom: "10px" }}>QUESTION:</div>
              <div style={{ fontSize: "13px", color: "#1a1a2e", lineHeight: "1.9" }}>
                {currentQ.question}
              </div>
            </Panel>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
              {currentQ.options.map((opt, i) => {
                const isOk = i === currentQ.correctIndex;
                const isSel = i === selected;
                let bg = "#FFF", prefBg = "#3B9DE8", txtC = "#1a1a2e";
                if (answered) {
                  if (isOk) { bg = "#D4EDDA"; prefBg = "#58B94E"; }
                  else if (isSel) { bg = "#FDDEDE"; prefBg = "#E8381A"; }
                  else { bg = "#F5F5F5"; prefBg = "#999"; txtC = "#888"; }
                }
                return (
                  <div key={i} className={`opt${answered ? " disabled" : ""}`}
                    onClick={() => handleAnswer(i)}
                    style={{
                      display: "flex", alignItems: "stretch",
                      background: bg, border: "3px solid #1a1a2e",
                      boxShadow: "4px 4px 0 #1a1a2e", overflow: "hidden",
                      cursor: answered ? "default" : "pointer",
                    }}
                  >
                    <div style={{
                      background: prefBg, color: "white",
                      fontFamily: "'Press Start 2P'", fontSize: "12px",
                      padding: "13px 12px", minWidth: "40px", textAlign: "center",
                      borderRight: "3px solid #1a1a2e", flexShrink: 0,
                    }}>
                      {answered ? (isOk ? "✓" : isSel ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                    </div>
                    <div style={{ padding: "11px 14px", fontSize: "11px", lineHeight: "1.8", fontFamily: "'Press Start 2P'", color: txtC }}>
                      {opt}
                    </div>
                  </div>
                );
              })}
            </div>

            {answered && (
              <div className="slideR">
                <Panel bg={selected === currentQ.correctIndex ? "#D4EDDA" : "#FDDEDE"} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", color: selected === currentQ.correctIndex ? "#2D5016" : "#8B0000", marginBottom: "8px" }}>
                    {selected === currentQ.correctIndex ? "★ CORRECT! ★" : "✗ WRONG!"}
                  </div>
                  <div style={{ fontSize: "10px", color: "#1a1a2e", lineHeight: "1.9" }}>
                    {currentQ.explanation}
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "10px", color: selected === currentQ.correctIndex ? "#58B94E" : "#E8381A" }}>
                    {selected === currentQ.correctIndex
                      ? `▲ MOVED TO LEVEL ${Math.min(buckets[currentId], MAX_LEVEL)}`
                      : "▼ BACK TO LEVEL 1 — REVIEW AGAIN"}
                  </div>
                </Panel>
              </div>
            )}

            <PixelBtn full disabled={!answered} color={answered ? "#3B9DE8" : "#555"} onClick={answered ? nextCard : undefined}>
              {answered ? "NEXT CARD  ▶" : "← SELECT AN ANSWER"}
            </PixelBtn>

            <div style={{ display: "flex", justifyContent: "center", gap: "28px", marginTop: "14px" }}>
              {[{ label: "✓", val: stats.correct, c: "#58B94E" }, { label: "✗", val: stats.wrong, c: "#E8381A" }, { label: "◎", val: stats.total, c: "#F7D51D" }].map(({ label, val, c }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "18px", color: c, textShadow: "2px 2px 0 #1a1a2e" }}>{val}</div>
                  <div style={{ fontSize: "9px", color: "#1a1a2e", marginTop: "3px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WRONG VIEW ── */}
        {view === "wrong" && (
          <div className="pop">
            <Panel bg="#1a1a2e" style={{ marginBottom: "12px", padding: "14px 16px" }}>
              <div style={{ fontSize: "13px", color: "#E8381A", marginBottom: "6px" }}>✗ WRONG ANSWERS</div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {wrongIds.size === 0 ? "NO MISTAKES YET — AMAZING!" : `${wrongIds.size} QUESTION${wrongIds.size > 1 ? "S" : ""} TO REVIEW`}
              </div>
            </Panel>

            {wrongIds.size === 0 ? (
              <Panel bg="#D4EDDA" style={{ textAlign: "center", padding: "32px 20px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎉</div>
                <div style={{ fontSize: "11px", color: "#2D5016", lineHeight: "2" }}>
                  FLAWLESS SO FAR!<br />NO WRONG ANSWERS.
                </div>
              </Panel>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {wrongQList.map(q => (
                  <Panel key={q.id} bg="#FFF5F5" style={{ padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
                      <span style={{ fontSize: "9px", background: UNIT_COLORS[q.unit], color: "white", border: "2px solid #1a1a2e", padding: "4px 8px", boxShadow: "2px 2px 0 #1a1a2e" }}>
                        UNIT {q.unit}
                      </span>
                      <span style={{ fontSize: "9px", color: "#888" }}>#{q.id} · {q.topic.toUpperCase().slice(0, 18)}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#1a1a2e", lineHeight: "1.9", marginBottom: "10px" }}>
                      {q.question}
                    </div>
                    <div style={{ background: "#D4EDDA", border: "2px solid #1a1a2e", padding: "9px", marginBottom: "7px", boxShadow: "2px 2px 0 #1a1a2e" }}>
                      <div style={{ fontSize: "9px", color: "#2D5016", marginBottom: "4px" }}>✓ CORRECT ANSWER:</div>
                      <div style={{ fontSize: "10px", color: "#1a1a2e", lineHeight: "1.7" }}>{q.options[q.correctIndex]}</div>
                    </div>
                    <div style={{ fontSize: "9px", color: "#444", lineHeight: "1.9" }}>{q.explanation}</div>
                  </Panel>
                ))}
              </div>
            )}

            {wrongIds.size > 0 && (
              <div style={{ marginTop: "12px" }}>
                <PixelBtn full color="#3B9DE8" onClick={() => { setUnitFilter(0); setView("study"); }}>
                  BACK TO STUDYING ▶
                </PixelBtn>
              </div>
            )}
          </div>
        )}

        {/* ── STATS VIEW ── */}
        {view === "stats" && (
          <div className="pop">
            <Panel bg="#1a1a2e" style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", color: "#F7D51D", textAlign: "center", marginBottom: "14px" }}>◈ SESSION STATS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "14px" }}>
                {[{ label: "CORRECT", val: stats.correct, c: "#58B94E" }, { label: "WRONG", val: stats.wrong, c: "#E8381A" }, { label: "TOTAL", val: stats.total, c: "#F7D51D" }].map(({ label, val, c }) => (
                  <div key={label} style={{ background: "#222", border: `2px solid ${c}`, padding: "10px 4px", textAlign: "center" }}>
                    <div style={{ fontSize: "20px", color: c }}>{val}</div>
                    <div style={{ fontSize: "9px", color: "#777", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>ACCURACY:</div>
              <div style={{ height: "12px", background: "#333", border: "2px solid #555" }}>
                <div style={{ height: "100%", background: "#58B94E", width: `${stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0}%`, transition: "width .4s steps(5)" }} />
              </div>
              <div style={{ fontSize: "10px", color: "#58B94E", textAlign: "right", marginTop: "4px" }}>
                {stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0}%
              </div>
            </Panel>

            {[1, 2, 3].map(u => {
              const uqs = QUESTIONS.filter(q => q.unit === u);
              const mastered = uqs.filter(q => buckets[q.id] >= 3).length;
              const pct = Math.round(mastered / uqs.length * 100);
              return (
                <Panel key={u} bg="#FFFFFF" style={{ marginBottom: "10px", padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "10px", color: UNIT_COLORS[u] }}>UNIT {u} MASTERY</span>
                    <span style={{ fontSize: "10px", color: "#1a1a2e" }}>{mastered}/{uqs.length} cards</span>
                  </div>
                  <div style={{ height: "10px", background: "#EEE", border: "2px solid #1a1a2e" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: UNIT_COLORS[u], transition: "width .4s steps(5)" }} />
                  </div>
                  <div style={{ fontSize: "9px", color: "#888", textAlign: "right", marginTop: "4px" }}>{pct}% mastered</div>
                </Panel>
              );
            })}

            {wrongIds.size > 0 && (
              <Panel bg="#FDDEDE" style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "10px", color: "#E8381A", marginBottom: "10px" }}>✗ TOPICS NEEDING WORK:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {[...new Set(wrongQList.map(q => q.topic))].slice(0, 8).map(t => (
                    <span key={t} style={{ fontSize: "9px", background: "#E8381A", color: "white", border: "2px solid #1a1a2e", padding: "4px 7px", boxShadow: "2px 2px 0 #1a1a2e" }}>
                      {t.toUpperCase()}
                    </span>
                  ))}
                </div>
              </Panel>
            )}

            <div style={{ display: "flex", gap: "8px" }}>
              <PixelBtn full color="#3B9DE8" onClick={() => setView("study")}>KEEP STUDYING ▶</PixelBtn>
              <PixelBtn full color="#E8381A" onClick={resetAll}>RESET ↺</PixelBtn>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "22px", fontSize: "9px", color: "#1a1a2e", opacity: 0.5 }}>
          LEITNER SPACED REPETITION · AI COURSE 22AD42
        </div>
      </div>
    </div>
  );
}
