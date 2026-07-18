import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/Button';
import { MaterialSummary } from '../components/MaterialSummary';
import { MaterialToolbar } from '../components/MaterialToolbar';
import { MaterialsTable } from '../components/MaterialsTable';

export function MaterialsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <PageHeader
        title="Learning Materials"
        description="Organize and share academic resources across courses."
        action={
          <Button>
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">upload_file</span>
            Add Material
          </Button>
        }
      />

      <MaterialSummary />
      <MaterialToolbar />
      <MaterialsTable materials={[]} />
    </div>
  );
}
