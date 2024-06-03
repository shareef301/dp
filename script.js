// The islands variable is used to store the list of islands. Each island is represented as an object with properties such as name, location, population, and attractions.
const islands = [
    { name: 'Malé', location: 'Kaafu Atoll', population: 92555, attractions: ['Center', 'Ports', 'Commercial Hub', 'Tourism'] },
    { name: 'Fuvahmulah', location: 'Fuvahmulah Atoll', population: 12380, attractions: ['Beaches', 'Lakes', 'Wetlands', 'Marshes', 'Forests', 'Resort', 'Tourism'] },
    { name: 'Villingili', location: 'Seenu Atoll', population: 6956, attractions: ['Resort', 'Marine Life', 'Guest Houses'] },
    { name: 'Hulhumale', location: 'Kaafu Atoll', population: 2866, attractions: ['Bridge', 'Marine Life', 'Guest Houses', 'Beaches'] }
];

// Getting the search input
const islandNameElement = document.getElementById('islandName');

// Search islands by name 
function searchByName(islands, name) {
    return islands.myFilter(island => island.name.toLowerCase().includes(name.toLowerCase()));
}
Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
};

// function to trigger when the search button is clicked
function search() {
    // get the search result into a variable
    searchResult = searchByName(islands, islandNameElement.value);

    // function to generate HTML for a single island
    const islandToHtml = (island) => `
    <div class="island">
        <div>
            <h2>${island.name}</h2>
            <p>Location: ${island.location}</p>
            <p>Population: ${island.population}</p>
            <p>
                Attractions: 
                ${island.attractions.map(attraction => `<span class="attribute">${attraction}</span>`).join('')}
            </p>
        </div>
        <div>
            <img src="./images/${island.name}.jpg" alt="${island.name}">
        </div>
    </div>
    `;

    // Function to combine HTML strings
    const combineHtml = (html, islandHtml) => html + islandHtml;

    // self-created map function
    Array.prototype.myMap = function(callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
        }
        return result;
    };
    
    // self-created reduce function
    Array.prototype.myReduce = function(callback, initialValue) {
        let accumulator = initialValue === undefined ? this[0] : initialValue;
        let startIndex = initialValue === undefined ? 1 : 0;
    
        for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
        }
    
        return accumulator;
    };
  

    // Pipe function (or compose)
    const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

    // Main function to generate the complete HTML and insert it into the DOM
    const generateHtml = pipe(
        (islands) => islands.myMap(islandToHtml),
        (htmlArray) => htmlArray.myReduce(combineHtml, ''),
        (html) => {
            document.getElementById('islands-container').innerHTML = html;
            return html;
        }
    );

    // Execute the main function
    generateHtml(searchResult);
}