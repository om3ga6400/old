document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('updates-container');

    async function fetchAllCommits(page = 1, commits = []) {
        const response = await fetch(`https://api.github.com/repos/${'om3ga6400'}/${'om3ga6400.github.io'}/commits?page=${page}&per_page=100`);
        const newCommits = await response.json();
        if (newCommits.length > 0) {
            return fetchAllCommits(page + 1, commits.concat(newCommits));
        }
        return commits;
    }

    fetchAllCommits()
        .then(commits => {
            if (Array.isArray(commits)) {
                commits.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));
                renderCommits(commits);
            } else {
                container.innerHTML = '<p>No commits found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching commits:', error);
            container.innerHTML = '<p>Error loading commits.</p>';
        });

    async function renderCommits(commits) {
        for (const commit of commits) {
            try {
                const response = await fetch(commit.url);
                const commitDetails = await response.json();
                const commitElement = document.createElement('a');
                const commitDate = new Date(commitDetails.commit.author.date).toLocaleString();
                const [commitTitle, ...commitDescriptionLines] = commitDetails.commit.message.split('\n');
                const commitDescription = commitDescriptionLines.join('\n') || 'No description available';
                const stats = commitDetails.stats || { additions: 0, deletions: 0, total: 0 };
                const changedFiles = commitDetails.files ? commitDetails.files.length : 0;
                const deploymentStatus = commitDetails.commit.message.toLowerCase().includes('deploy failed') ? 'failed' : 'passed';

                const truncatedTitle = commitTitle.length > 50 ? commitTitle.substring(0, 47) + '...' : commitTitle;

                commitElement.href = commit.html_url;
                commitElement.target = '_blank';
                commitElement.className = 'commit-entry';
                commitElement.innerHTML = `
                    <div class="commit-content">
                        <p class="commit-status ${deploymentStatus}">
                            ${deploymentStatus === 'passed' ? 'Deployment Passed' : 'Deployment Failed'}
                        </p>
                        <div class="commit-details">
                            <h3>${truncatedTitle}</h3>
                            <p class="commit-description">${commitDescription}</p>
                            <p class="commit-date">${commitDate}</p>
                        </div>
                        <div class="commit-stats">
                            <span><i class="fa-solid fa-plus"></i> ${stats.additions} added</span>
                            <span><i class="fa-solid fa-minus"></i> ${stats.deletions} deleted</span>
                            <span><i class="fa-solid fa-code-branch"></i> ${stats.total} changed</span>
                            <span><i class="fa-solid fa-file-alt"></i> ${changedFiles} changed files</span>
                        </div>
                    </div>
                `;

                container.appendChild(commitElement);
            } catch (error) {
                console.error('Error fetching commit details:', error);
            }
        }
    }
});