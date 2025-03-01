import ServiceHeader from '../components/service-list-page/service-header';
import ServiceTitle from '../components/service-list-page/service-title';
import ServiceFilter from '../components/service-list-page/service-filter';
import ServiceCard from '../components/service-list-page/service-card';
import ServiceContentFooter from '../components/service-list-page/service-content-footer';
import ServiceFooter from '../components/service-list-page/service-footer';
import { FilterProvider } from '../context/filter-context';
import UserHeader from '../components/user-header';

function ServiceListPage() {
  return (
    <div className="w-full h-full bg-background overflow-clip">
      <UserHeader />
      <ServiceTitle />
      <FilterProvider>
        <ServiceFilter />
        <ServiceCard />
      </FilterProvider>
      <ServiceContentFooter />
      <ServiceFooter />
    </div>
  );
}

export default ServiceListPage;
