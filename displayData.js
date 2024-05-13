// Example function to simulate receiving data. Replace it with your actual data handling logic.
document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem('formData'));
    localStorage.removeItem('formData'); // Clean up local storage after loading data


    if (data) {
        document.getElementById('projectTitle').textContent = data.summary['bus factor name'] + " Project";
        document.getElementById('summaryText').textContent = "Lorem ipsum summary for " + data.summary['bus factor name'];
        document.getElementById('busFactorNumber').textContent = data['bus factor number'];

        // Populate user clusters
        const clustersContainer = document.getElementById('userClusters');
        data['user cluster data'].forEach(cluster => {
            const clusterDiv = document.createElement('div');
            clusterDiv.className = 'user-cluster';
            clusterDiv.innerHTML = `<span>${cluster.name}</span>
            <div class="progress" style="width: 100%;">
                <div class="progress-bar" style="width: ${cluster.percentage}%;">${cluster.percentage}%</div>
            </div>`;
            clustersContainer.appendChild(clusterDiv);
        });

        // Populate lists
        const populateList = (listId, items) => {
            const list = document.getElementById(listId);
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                list.appendChild(listItem);
            });
        };

        populateList('branchList', data['branch list']);
        populateList('directoryList', data['directory list']);
        populateList('fileList', data['file list']);

        // Populate other data
        document.getElementById('lineCount').textContent = data['line count'];
        document.getElementById('method').textContent = data['method id'];
        document.getElementById('developerCount').textContent = data['developer count'];
        document.getElementById('busFactorCount').textContent = data['bus factor number'];
        document.getElementById('repeatedBusFactorName').textContent = data['bus factor name'];
    } else {
        console.error('No data received!');
    }
});
