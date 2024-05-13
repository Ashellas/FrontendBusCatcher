document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('responseData'));
    if (data) {
        displayResults(data);
    } else {
        console.error('No data received!');
    }
});

function displayResults(data) {
    // Display basic data
    document.getElementById('lineCount').textContent = data.total_lines;
    document.getElementById('method').textContent = data.method;
    document.getElementById('developerCount').textContent = data.total_contributors;
    document.getElementById('busFactorNumber').textContent = data.bus_factor_count;

    // Populate branches list
    populateList('branchList', data.branches);

    // Populate files list
    populateList('fileList', data.files_analyzed);

    // Populate bus factor data
    const busFactorDataContainer = document.getElementById('userClusters');
    for (const [key, value] of Object.entries(data.bus_factor_data)) {
        const clusterDiv = document.createElement('div');
        clusterDiv.className = 'user-cluster';
        clusterDiv.innerHTML = `<span>${key}</span>
            <div class="progress" style="width: 100%;">
                <div class="progress-bar" style="width: ${value}%;">${value}%</div>
            </div>`;
        busFactorDataContainer.appendChild(clusterDiv);
    }

    // Attach back button event listener
    document.getElementById('backButton').addEventListener('click', function() {
        window.location.href = 'index.html'; // Adjust if your home page has a different name
    });
}

function populateList(listId, items) {
    const list = document.getElementById(listId);
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
}
