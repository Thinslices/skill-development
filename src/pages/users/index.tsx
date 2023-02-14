import type { User } from "@prisma/client";
import { type NextPage } from "next";
import { useTable } from "react-table";

import { Layout, Table } from "../../components";
import { useUserColumns } from "../../components/UserTable/useUserColumns";
import { api } from "../../utils/api";

const UsersPage: NextPage = () => {
  const columns = useUserColumns();
  const { data } = api.user.getAll.useQuery();
  const tableInstance = useTable<User>( { columns, data: data ?? [] } )

  return (
    <Layout>
      <h1 className="h1 mb-12">Users</h1>
      <Table tableInstance={ tableInstance } />
    </Layout>
  );
};

export default UsersPage;
