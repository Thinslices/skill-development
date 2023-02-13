import type { User } from "@prisma/client";
import { type NextPage } from "next";
import { useTable } from "react-table";

import { Breadcrumbs, Layout, Table } from "../../components";
import { useUserColumns } from "../../components/UserTable/useUserColumns";
import { useBreadcrumbs } from "../../hooks";
import { api } from "../../utils/api";

const UsersPage: NextPage = () => {
  const columns = useUserColumns();
  const { data } = api.user.getAll.useQuery();
  const tableInstance = useTable<User>( { columns, data: data ?? [] } )
  const breadcrumbs = useBreadcrumbs();

  return (
    <Layout>
      <div className="space-y-8">
        <Breadcrumbs breadcrumbs={ breadcrumbs } />
        <h1 className="h1 mb-12">Users</h1>
        <Table tableInstance={ tableInstance } />
      </div>
    </Layout>
  );
};

export default UsersPage;
