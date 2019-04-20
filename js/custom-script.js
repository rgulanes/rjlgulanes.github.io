$(document).ready(function () {
	var otherJobs = $('#other-jobs'),
      itRelatedJobs = $('#itrelated-jobs'),
      licensesCerts = $('#licenses-certifications'),
      courseAttended = $('#courses-attended'),
      acadCareer = $('#academic-career'),
      programmingRelated = $('#programming-skill'),
      softwareRelated = $('#softwarerelated-skill'),
      otherRelated = $('#otherrelated-skill');

  // Work Experience
  $.get('./json/work-experience.json', function (data) {
    var itWork = data.itrelated, otherWork = data.otherjob;

    itRelatedJobs.html('');
    otherJobs.html('');
    $.each(itWork, function (index, info) {
      if (info.show) {
        var duties = '';

        if(info.duties.length) {
          $.each(info.duties, function (i, duty) {
            duties += ('<li>' + duty + '</li>');
          });
        }

        var html = [
          '<div class="experience margin-b-50">',
            '<h4 class="text-uppercase"><b>'+ info.position +'</b></h4>',
            '<h5 class="font-yellow text-uppercase">',
              '<b>'+ info.company,
              (info.division ? '<br><small>' + info.division + '</small>' : '' ),
              '</b>',
            '</h5>',
            '<h6 class="font-lite-black margin-tb-10 text-uppercase">'+ info.duration +'</h6>',
            (info.duties.length ? '<p class="margin-tb-10">Summary of Actual Duties:</p>' : ''),
            (info.duties.length ? '<ul class="list margin-b-30 text-sm">' : ''),
            (info.duties.length ? duties : ''),
            (info.duties.length ? '</ul>' : ''),
          '</div>'
        ].join('');

        itRelatedJobs.append(html);
      }
    });

    $.each(otherWork, function (index, info) {
      if (info.show) {
        var duties = '';

        if(info.duties.length) {
          $.each(info.duties, function (i, duty) {
            duties += ('<li>' + duty + '</li>');
          });
        }

        var html = [
          '<div class="experience margin-b-50">',
            '<h4 class="text-uppercase"><b>'+ info.position +'</b></h4>',
            '<h5 class="font-yellow text-uppercase">',
              '<b>'+ info.company,
              (info.division ? '<br><small>' + info.division + '</small>' : '' ),
              '</b>',
            '</h5>',
            '<h6 class="font-lite-black margin-tb-10 text-uppercase">'+ info.duration +'</h6>',
            (info.duties.length ? '<p class="margin-tb-10">Summary of Actual Duties:</p>' : ''),
            (info.duties.length ? '<ul class="list margin-b-30 text-sm">' : ''),
            (info.duties.length ? duties : ''),
            (info.duties.length ? '</ul>' : ''),
          '</div>'
        ].join('');

        otherJobs.append(html);
      }
    });
  });

  // Licenses and Certifications
  $.get('./json/licenses-certifications.json', function (data) {
    licensesCerts.html('');

    $.each(data, function (index, cert) {
      if(cert.show) {
        var html = [
          '<div class="experience margin-b-50">',
            '<h4 class="text-uppercase"><b>'+ cert.title +'</b></h4>',
            '<h5 class="font-yellow text-uppercase"><b>'+ cert.company +'</b></h5>',
            '<h6 class="font-lite-black text-uppercase">Issued '+ cert.issuance +'</h6>',
          '</div>'
        ].join('');

        licensesCerts.append(html);
      }
    });
  });

  // Courses Attended
  $.get('./json/courses-attended.json', function (data) {
    courseAttended.html('');

    $.each(data, function (index, course) {
      if(course.show) {
        var html = [
          '<div class="experience margin-b-50">',
            '<h4 class="text-uppercase"><b>'+ course.title +'</b></h4>',
            '<h5 class="font-yellow text-uppercase">',
              '<b>'+ course.company,
              (course.division ? '<br><small>' + course.division + '</small>' : '' ),
              '</b>',
            '</h5>',
            '<h6 class="font-lite-black text-uppercase">Issued '+ course.date +'</h6>',
          '</div>'
        ].join('');

        courseAttended.append(html);
      }
    });
  });

  // Education
  $.get('./json/academic-career.json', function (data) {
    acadCareer.html('');

    $.each(data, function (index, school) {
      if(school.show) {
        var distinctions = '';

        if(school.distinctions.length) {
          $.each(school.distinctions, function (i, data) {
            var award = [
              '<span class="margin-2 text-sm badge badge-pill '+ (data.is_honor ? 'badge-success text-uppercase' : 'badge-default') +'">',
                '<b>'+ data.name + '</b>',
              '</span>'
            ].join('');

            distinctions += award;
          });
        }

        var html = [
          '<div class="education margin-b-50">',
            '<h4 class="text-uppercase"><b>'+ school.name +'</b></h4>',
            (school.degree ? '<h5 class="font-yellow text-uppercase"><b>'+ school.degree +'</b></h5>' : ''),
            '<h6 class="font-lite-black text-uppercase">'+ school.date_graduated +'</h6>',
            (school.distinctions.length ? '<p class="margin-tb-10"><u class="text-sm">Honors and/or Awards:</u> <br>'+ distinctions +'</p>' : ''),
          '</div>'
        ].join('');

        acadCareer.append(html);
      }
    });
  });

  // Skills and Knowledge
  $.get('./json/skills-knowledge.json', function (response) {
    programmingRelated.find('div.panel-desc').html('');
    softwareRelated.find('div.panel-desc').html('');
    otherRelated.find('div.panel-desc').html('');

    $.each(response.data, function (index, skill) {
      if(skill.show) {
        var html = [
          '<div class="col-sm-12 col-md-6">',
            '<div class="line-progress margin-b-5" data-prog-percent=".'+ skill.rate +'" data-prog-text="">',
              '<p class="progress-title">',
                '<b>'+ skill.description +'</b>',
              '</p>',
              '<div></div>',
            '</div>',
          '</div>'
        ].join('');

        switch(skill.classification) {
          case 1 : 
            programmingRelated.find('div.panel-desc').append(html);
            break;
          case 2 : 
            softwareRelated.find('div.panel-desc').append(html);
            break;
          case 3 : 
            otherRelated.find('div.panel-desc').append(html);
            break;
        }
      }
    });
    
    enableLineProgress();
  });
});