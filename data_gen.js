Villages = new Meteor.Collection("villages");

if (Meteor.isServer) {
  Meteor.startup(function () {

    var lat =  -29.308319;
    var longitude =  27.491600;
    
    Villages.remove({});

    if(Villages.find().count() === 0) {
      var vils = [
        "Manduar",
        "Penyem",
        "Busura",
        "Dimbaya",
        "Kabekel"
      ];

      var communities = ["PHC", "Non_PHC", "BFCI"];

      for (var j=0; j<vils.length; j++) 
      {
        var newlat =  lat + Math.random()/2;
        var newlong = longitude + Math.random()/2;

        //which type of community this is
        var comm = Math.floor(Math.random()*communities.length);

        //number of people in the village
        var num_men = Math.floor(Math.random()*50);
        var num_women = Math.floor(Math.random()*50);

        var today = new Date();

        //dates of pregnancies
        var pregnancies = Math.floor(Math.random()*num_women/2);
        var pregnant_dates = [];
        for (var i=0; i < pregnancies; i++)
        {
          var p = new Date();
          p.setDate(today.getDate()+Math.floor(Math.random()*90));
          pregnant_dates.push(p);
        }

        //dates of hiv medication
        var hivcases = Math.floor(Math.random()*(num_women+num_men)/4);
        var hiv_dates = [];
        for (var i = 0; i < hivcases; i++) {
          var p = new Date();
          p.setDate(today.getDate()+Math.floor(Math.random()*30));
          hiv_dates.push(p);
        }

        //dates of bloodtest
        var bloodtests = Math.floor(Math.random()*(num_women+num_men)/2);
        var blood_dates = [];
        for (var i = 0; i < bloodtests; i++) {
          var p = new Date();
          p.setDate(today.getDate()+Math.floor(Math.random()*90));
          blood_dates.push(p);
        }

        //dates of immunizations
        var immuns = Math.floor(Math.random()*(num_women+num_men)/8);
        var immun_dates = [];
        for (var i = 0; i < immuns; i++) {
          var p = new Date();
          p.setDate(today.getDate()+Math.floor(Math.random()*150));
          immun_dates.push(p);
        }

        Villages.insert( {
            Townname: vils[j],
            latitude: newlat,
            longitude: newlong,
            community: communities[comm],
            urgency_color: "green",
            numbermen: num_men,
            numberwomen: num_women,
            pregnant: pregnant_dates,
            hiv: hiv_dates,
            bloodtests: blood_dates,
            immunizations: immun_dates
        });

      }
    }
    
    console.log(Villages.find().fetch());

  });
}
