/* eslint-disable sonarjs/no-identical-functions */
export async function handleHome(navigate) {
  const navegar = () => {
    if (localStorage.getItem('role') === 'nutricionista') {
      navigate('/nutricionista/home');
    } else if (localStorage.getItem('role') === 'gestor') {
      navigate('/escola/home');
    } else if (localStorage.getItem('role') === 'fornecedor') {
      navigate('/fornecedor/home');
    }
  };
  navegar();
}
export async function handleNavigate(navigate, route) {
  const navegar = () => {
    navigate(`${route}`);
  };
  navegar();
}
