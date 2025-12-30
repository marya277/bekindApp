import { useState } from 'react';
import { useActionsStore } from '../../store/actionsStore';
import { Input } from '../ui/Input';
import { Loader } from '../ui/Loader';

interface CreateActionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateActionForm = ({ onSuccess, onCancel }: CreateActionFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#00A896');
  const [status, setStatus] = useState(1);
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { createAction, isLoading, error, clearError } = useActionsStore();

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, icon: 'El archivo debe ser menor a 2MB' });
        return;
      }

      if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(file.type)) {
        setErrors({ ...errors, icon: 'Solo se permiten archivos PNG, JPG o SVG' });
        return;
      }

      setIcon(file);
      setErrors({ ...errors, icon: '' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!description || description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!icon) {
      newErrors.icon = 'Debes seleccionar un icono';
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
      newErrors.color = 'Debe ser un color HEX válido (ej: #00A896)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await createAction({
        name,
        description,
        color,
        status,
        icon: icon!,
      });

      setName('');
      setDescription('');
      setColor('#00A896');
      setStatus(1);
      setIcon(null);
      setIconPreview('');
      setErrors({});

      onSuccess?.();
    } catch (err) {
      console.error('Error al crear acción:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nombre de la categoría*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Escribir el nombre de la buena acción"
        disabled={isLoading}
      />

      <div>
        <label className="label">Descripción de la buena acción*</label>
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Agregar descripción"
            rows={4}
            maxLength={100}
            disabled={isLoading}
            className={`input resize-none w-full ${errors.description ? 'input-error' : ''}`}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {description.length}/100
          </div>
        </div>
        {errors.description && <p className="error-text">{errors.description}</p>}
      </div>

      <div>
        <label className="label">Logo*</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          {iconPreview ? (
            <div className="flex flex-col items-center gap-3">
              <img src={iconPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setIcon(null);
                  setIconPreview('');
                }}
                className="text-sm text-brand-primary hover:underline font-medium"
              >
                Cambiar archivo
              </button>
            </div>
          ) : (
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                onChange={handleIconChange}
                className="hidden"
                disabled={isLoading}
              />
              <div className="flex flex-col items-center gap-3">
                <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Carga archivo</span>
              </div>
            </label>
          )}
        </div>
        {errors.icon && <p className="error-text">{errors.icon}</p>}
      </div>

      <div>
        <label className="label">Color*</label>
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value.toUpperCase())}
              placeholder="#00A896"
              maxLength={7}
              disabled={isLoading}
              className={`input ${errors.color ? 'input-error' : ''}`}
            />
            {errors.color && <p className="error-text mt-1">{errors.color}</p>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value.toUpperCase())}
              disabled={isLoading}
              className="w-12 h-12 rounded-md border-2 border-gray-300 cursor-pointer"
              title="Seleccionar color"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Selecciona un color o ingresa un código HEX
        </p>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Activo</span>
        <button
          type="button"
          onClick={() => setStatus(status === 1 ? 0 : 1)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            status === 1 ? 'bg-brand-primary' : 'bg-gray-300'
          }`}
          disabled={isLoading}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              status === 1 ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {error && (
        <div className="bg-status-error/10 border border-status-error rounded-lg p-3">
          <p className="text-sm text-status-error text-center">{error}</p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary flex-1 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size="sm" className="border-white border-t-transparent" />
              <span>Creando...</span>
            </>
          ) : (
            'Crear'
          )}
        </button>
      </div>
    </form>
  );
};
