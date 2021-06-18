let dataURL = "../dataset/poids.csv";
let programme = [];
let singleYear = [];
let yearCount = [];


LoadData(dataURL)
    .then(response =>{
        console.log("All data have been loaded");
        // console.log(programme)
        //SortDataByOccurence(programme, singleYear, yearCount);
        console.log(singleYear, yearCount);
        /* récupérer une partie du des données
        programme       = programme.slice(0, 24); //x = inde de départ, y = index d'arrivée
        yearCount   = yearCount.slice(0, 24); //x = inde de départ, y = index d'arrivée
        */
        let programmeMonth  = programme.slice(1, 32);
        let yearCountMonth  = yearCount.slice(1, 32);

        let programmeMonth2  = programme.slice(32, 62);
        let yearCountMonth2  = yearCount.slice(32, 62);
        
        let programmeMonth3  = programme.slice(62, 93);
        let yearCountMonth3  = yearCount.slice(62, 93);

        let programmeMonth4  = programme.slice(93, 108);
        let yearCountMonth4  = yearCount.slice(93, 108);

        BarGraph('resultat', yearCount, programme, 'yearCount');
        BarGraph('resultat-02', yearCountMonth, programmeMonth, 'yearCountMonth');
        BarGraph('resultat-03', yearCountMonth2, programmeMonth2, 'yearCountMonth');
        BarGraph('resultat-04', yearCountMonth3, programmeMonth3, 'yearCountMonth');
        BarGraph('resultat-05', yearCountMonth4, programmeMonth4, 'yearCountMonth');
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
        programme.push(kg);
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
 function BarGraph(dst, labels, data, axis){
    const ctx = document.getElementById(dst).getContext('2d');

    //draw a bar chart
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: axis,
                backgroundColor: 'rgb(3, 7, 252, 1)',
                hoverBackgroundColor : '#00fff2',
                borderWidth: 0,
                barThickness: 8,
                minBarLength : 3,
                data: data
            },

        ]
        },

        // Configuration options go here
        options: {
            responsive: true
        }
    });
}

