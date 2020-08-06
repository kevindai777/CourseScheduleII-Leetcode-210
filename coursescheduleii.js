//Objective is, given a number of courses given by 'numCourses', to find the correct order
//to take all classes labeled from 0 to n - 1, also labeled as 'prerequisites'.

let numCourses = 2, prerequisites = [[1,0]] 


//O(V + E) where V and E represent the number of vertices and edges respectively

let graph = new Map()
let indegrees = new Array(numCourses).fill(0)
buildGraph()
return bfs(graph, indegrees)

function buildGraph() {
    for (let [e,v] of prerequisites) {
        if (graph.has(v)) {
            graph.get(v).push(e)
        } else {
            graph.set(v, [e])
        }
        
        indegrees[e]++
    }
}

function bfs(graph, indegrees) {
    let result = []
    let queue = []
    
    //Find the starting node
    for (let i = 0; i < indegrees.length; i++) {
        if (indegrees[i] == 0) {
            queue.push(i)
        }
    }
    
    while (queue.length > 0) {
        let curr = queue.shift()
        if (graph.has(curr)) {
            //Visit all neighbors
            for (let neighbor of graph.get(curr)) {
                indegrees[neighbor]--
                if (indegrees[neighbor] == 0) {
                    queue.push(neighbor)
                }
            }   
        }
        
        result.push(curr) 
    }
    
    return result.length == numCourses ? result : []
}