import { useNavigate } from 'react-router-dom';
import { CreateActionForm } from '../components/actions/CreateActionForm';

const CreateAction = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        {/* Header centrado */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Crear nueva categoría</h1>
          <p className="text-sm text-gray-500 mt-2">
            Completa el formulario para crear una nueva categoría de acción
          </p>
        </div>

        {/* Formulario en card */}
        <div className="card p-8">
          <CreateActionForm 
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAction;