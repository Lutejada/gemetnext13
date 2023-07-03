export interface Route {
  name: string;
  icon?: any;
  path: string;
  subRoute?: Route[];
}

export const routes: Route[] = [
  {
    name: "Equipos",
    icon:'',
    path:'/equipos',
    subRoute:[
      {
        name:'Crear',
        path:'/crear',
      }
    ]
  },
  {
    name: "Patrones",
    icon:'',
    path:'/patrones',
    subRoute:[
      {
        name:'Crear',
        path:'/crear',
      }
    ]
  },
  {
    name: "Configuracion",
    icon:'',
    path:'/configuracion',
    subRoute:[
      {
        name:'Responsable',
        path:'/responsable',
      },
      {
        name:'Ubicacion',
        path:'/ubicacion',
      },
      {
        name:'Magnitud',
        path:'/magnitud',
      },
      {
        name:'Variables',
        path:'/variables',
      },
      {
        name:'Actividades',
        path:'/actividades',
      },
      {
        name:'Frecuencias',
        path:'/frecuencias',
      },
    ]
  },
];
