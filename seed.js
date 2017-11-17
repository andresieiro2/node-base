import config from './config.json';
import DB from './app/db';
import populate from './app/db/populate';
import _ from 'lodash';

DB({
  db: config.DB.dbname,
  user: config.DB.user,
  password: config.DB.password,
});

let filters;

populate('ServiceType', [
  {
    name: "Benefícios"
  },
  {
    name: "Pilares"
  }
])
.then( servicesTypes => {

  const beneficios = _.find(servicesTypes, obj => obj.name === 'Benefícios' );
  const pilares = _.find(servicesTypes, obj => obj.name === 'Pilares' );

  populate('Filter', [
    {
      name: "Sua Operação",
      serviceType: beneficios.id,
    },
    {
      name: "Sua Empresa",
      serviceType: beneficios.id,
    },
    {
      name: "Seu Time",
      serviceType: beneficios.id,
    },
    {
      name: "Suas Soluções",
      serviceType: beneficios.id,
    },
    {
      name: "Suas Demandas",
      serviceType: beneficios.id,
    },
    {
      name: "Estratégia",
      serviceType: pilares.id,
    },
    {
      name: "Transformação Lean/Ágil",
      serviceType: pilares.id,
    },
    {
      name: "Design Studio",
      serviceType: pilares.id,
    },
    {
      name: "Garagem de Software",
      serviceType: pilares.id,
    },
    {
      name: "Body Shop",
      serviceType: pilares.id,
    },
  ])
  .then( _filters => {
    filters = _filters;
    const services = [];
    for (var i = 0; i < 20; i++) {
      services.push (
        {
          name: "Serviço " + i,
          description: "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos " + i,
          slug: "servico-" + i
        }
      )
    }
    populate("Service",services)
    .then( services => {
      populate('ServiceFilter', [
        {
          filter: filters[0].id,
          service: services[0].id,
        },
        {
          filter: filters[1].id,
          service: services[1].id,
        },
        {
          filter: filters[2].id,
          service: services[2].id,
        },
        {
          filter: filters[0].id,
          service: services[1].id,
        },
        {
          filter: filters[0].id,
          service: services[2].id,
        },
        {
          filter: filters[1].id,
          service: services[2].id,
        },
        {
          filter: filters[3].id,
          service: services[3].id
        },
        {
          filter: filters[3].id,
          service: services[0].id,
        },
      ])
      .then( () => {
        console.log("DONE");
        process.exit();
      });
    })
  })

});
