var settings = {
  "url": "https://boards-api.greenhouse.io/v1/boards/charles/jobs",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
  response.jobs.forEach(job => {
    console.log(job);
    var template = `
    <div class="job">
      <div class="logo">
        <img src="https://www.hello-charles.com/hubfs/Navigation%20(1).png">
    </div>
    <a target="_blank" rel="noopener noreferrer nofollow" href="${ job.absolute_url }"><div class="job_title">
      <h3>
      <strong>${job.title}</strong>
    </h3>
    <p>
      ${ job.location.name }
      </p>
    </div></a>
    <div class="job_btn">
      <a target="_blank" rel="noopener noreferrer nofollow" href="${ job.absolute_url }">Apply</a>
    </div>
    </div>`;
    
    $('.job_embed').append(template)
  })
});