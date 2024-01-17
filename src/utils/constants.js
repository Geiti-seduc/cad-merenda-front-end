export const application = 'application/json';
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};

export const sizes = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1200,
  xl2: 1440,
};

export const measures = [
  { label: 'UN', value: 'UNIDADE' },
  { label: 'LT', value: 'LITRO' },
  { label: 'KG', value: 'QUILO' },
  {label: 'ML', value: 'MILILITRO'},
  { label: 'G', value: 'GRAMA'},
];
