let dataURL = "../dataset/poids.csv";
let poids = [];
let singleYear = [];
let yearCount = [];


LoadData(dataURL)
    .then(response =>{
        console.log("All data have been loaded");
        // console.log(poids)
        //SortDataByOccurence(poids, singleYear, yearCount);
        console.log(singleYear, yearCount);
        /* récupérer une partie du des données
        poids       = poids.slice(0, 24); //x = inde de départ, y = index d'arrivée
        yearCount   = yearCount.slice(0, 24); //x = inde de départ, y = index d'arrivée
        */
        BarGraph();
    })
    .catch(error => {
        console.error(error);
    })

async function LoadData(dataURL){
    const response  = await fetch(dataURL);
    const rawData   = await response.text();
    // console.log(rawData);
    /**
     * rawData is store as a simple text. We need to parse the CSV
     * and store each data into a readable array
     * We use the split() for that purpose https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/split
     * We also remove the first rows, the header, from the data set
     */
    const data = rawData.split("\n").slice(1);
    // console.log(rows);
    /*
     * Now we can retreive each data into their own cols
     */
    data.forEach(row => {
        const columns   = row.split(',');
        const kg        = columns[0];
        const day       = columns[1];
        const mouth     = columns[2];
        const years     = columns[3];
        const dmy       = columns[4];
        const sport     = columns[5];
        const end       = columns[6];
        // console.log(kg+" :: "+dmy);
        poids.push(kg);
        yearCount.push(dmy);

        // console.log(mass, year);

        //sort data and count the number of occurence
        // const singleYear    = [];
        // const yearCount     = [];
        
        // console.log(singleYear, yearCount)
    })
}



/**
 * Draw the data
 */
function BarGraph(){
    const ctx = document.getElementById('poids').getContext('2d');

    //draw a bar chart
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: yearCount,
            datasets: [{
                label: 'poids',
                backgroundColor: 'rgb(92, 57, 126)',
                hoverBackgroundColor : '#ba73ff',
                borderWidth: 0,
                barThickness: 8,
                minBarLength : 3,
                data: poids
            },

        ]
        },

        // Configuration options go here
        options: {
            responsive: false
        }
    });
}
