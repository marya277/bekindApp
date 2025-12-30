import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateActionForm } from '../components/actions/CreateActionForm';

const CreateAction = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {showSuccess && (
          <div className="mb-6 bg-status-success/10 border-2 border-status-success rounded-card p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-status-success rounded-full flex items-center justify-center">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-status-success text-lg">
                  ¡Categoría creada exitosamente!
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Redirigiendo al dashboard en 5 segundos...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Crear nueva categoría
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Completa el formulario para crear una nueva categoría de acción
          </p>
        </div>

        <div className="card p-6">
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