document.addEventListener("DOMContentLoaded", function () {
  const username = "om3ga6400";
  const container = document.getElementById("repos-container");

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((repos) => {
      const rows = [];
      let row;

      repos.forEach((repo, index) => {
        if (index % 2 === 0) {
          row = document.createElement("div");
          row.style.display = "flex";
          row.style.margin = "-2px";
          rows.push(row);
        }

        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");
        repoCard.style.margin = "5px";
        repoCard.innerHTML = `<img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}&theme=catppuccin_mocha&hide_border=true&bg_color=181825&description_lines_count=1">`;
        row.appendChild(repoCard);
      });

      rows.forEach((row) => container.appendChild(row));
    })
    .catch((error) => console.error("Error fetching repos:", error));
});
