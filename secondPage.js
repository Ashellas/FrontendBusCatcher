document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('responseData'));
    localStorage.removeItem('responseData'); // Clean up local storage after loading data

    if (data) {
        // Set project title if necessary, omitted here as it seems you removed that requirement

        // Populate user clusters and update Bus Factor based on the number of clusters
        const clustersContainer = document.getElementById('userClusters');
        if (data['user cluster data'] && data['user cluster data'].length > 0) {
            data['user cluster data'].forEach(cluster => {
                const clusterDiv = document.createElement('div');
                clusterDiv.className = 'user-cluster';
                clusterDiv.innerHTML = `<span>${cluster.name}</span>
                    <div class="progress" style="width: 100%;">
                        <div class="progress-bar" style="width: ${cluster.percentage}%;">${cluster.percentage}%</div>
                    </div>`;
                clustersContainer.appendChild(clusterDiv);
            });
            // Update Bus Factor Number to the length of user clusters
            document.getElementById('busFactorNumber').textContent = data['user cluster data'].length;
        } else {
            // If no user clusters data, set Bus Factor to 0
            document.getElementById('busFactorNumber').textContent = '0';
        }

        // Populate lists
        populateList('branchList', data['branch list']);
        populateList('fileList', data['file list']);

        // Populate other details
        document.getElementById('lineCount').textContent = data['line count'];
        document.getElementById('method').textContent = data['method id'];
        document.getElementById('developerCount').textContent = data['developer count'];
    } else {
        console.error('No data received!');
        document.getElementById('busFactorNumber').textContent = 'Error!';
    }

    function populateList(listId, items) {
        const list = document.getElementById(listId);
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Make sure the path matches your directory structure
});