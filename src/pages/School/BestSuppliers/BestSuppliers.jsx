/* eslint-disable */
import { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAuthUser } from 'react-auth-kit';
import Button from '../../../components/button/Button';
import PrintIcon from '@mui/icons-material/Print';


import './BestSuppliers.scss';

function BestSuppliers() {
  const authUser = useAuthUser();
  const userToken = authUser().token;
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const responseSupplier = await fetch('http://localhost:3001/supplier', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });
        const dataSuppliers = await responseSupplier.json();
        console.log(dataSuppliers);
        setSuppliers(dataSuppliers); // Atualizando o estado com a lista de fornecedores
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <main className="bestSuppliers_page">
      <section className="wrapper">

        <header className="search-container gap-2">
          <h1 className="text-[#005CA9] text-2xl font-extrabold">
            MELHORES FORNECEDORES
          </h1>

          <div className="flex gap-2">
            <span className="span-processo font-medium">
              PROCESSO FINALIZADO
            </span>
            <p>
              PERÍODO ENCERRADO EM DD/MM/YYYY
            </p>
          </div>
        </header>

        <section className="container-table">
          <article className="card">
            <DataTable
              value={ suppliers }
              scrollable
              scrollHeight="550px"
              tableStyle={ { minWidth: '50rem', maxWidth: '1270px' } }
            >
              <Column
                field="company_name"
                header="FORNECEDOR"
                sortable
                style={ { width: '50%' } }
              />
              <Column
                field="orcamento"
                header="ORÇAMENTO"
                sortable
                style={ { width: '50%' } }
              />
            </DataTable>
          </article>
        </section>
        <Button
          icon={ <PrintIcon /> }
          content="GERAR RELATORIO"
          color="--white"
          active="--white"
          border="border-[1px]"
          borderColor="--blue"
          background="--blue"
          radius="rounded-2xl"
          classes="whitespace-nowrap px-5 w-60"
        />
      </section>
    </main>
  );
}

export default BestSuppliers;
