const { shell } = require('electron');
const { dialog } = require('@electron/remote');

function generateToken() {
    shell.openExternal('https://github.com/settings/tokens');
}

document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkPathButton');
    checkButton.addEventListener('click', () => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then(result => {
            if (!result.canceled) {
                document.getElementById('path').value = result.filePaths[0];
            }
        }).catch(err => {
            console.error('Failed to open dialog:', err);
        });
    });

    const form = document.getElementById('projectForm');
    const spinner = document.getElementById('loadingSpinner');
    const loadingText = document.getElementById('loadingText');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var formData = {
            path: document.getElementById('path').value.trim(),
            owner: document.getElementById('owner').value.trim(),
            repo_name: document.getElementById('name').value.trim(),
            github_token: document.getElementById('githubToken').value.trim(),
            method_id: parseInt(document.getElementById('method').value.trim())
        };



        spinner.style.display = 'block';
        loadingText.textContent = 'Waiting for calculation...';

        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                localStorage.setItem('responseData', JSON.stringify(data));
                spinner.style.display = 'none';
                setTimeout(() => {
                    window.location.href = 'secondPage.html';
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                spinner.style.display = 'none';
                loadingText.textContent = 'Error occurred: ' + error.message;
            });
    });
});
