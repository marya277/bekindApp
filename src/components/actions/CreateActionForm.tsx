import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useActionsStore } from "../../store/actionsStore";
import { Input, Loader } from "../ui";
import { createActionSchema, type CreateActionFormData } from "../../schemas";

interface CreateActionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateActionForm = ({
  onSuccess,
  onCancel,
}: CreateActionFormProps) => {
  const { createAction, isLoading, error, clearError } = useActionsStore();
  const [iconPreview, setIconPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateActionFormData>({
    resolver: zodResolver(createActionSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#00A896",
      status: 1,
    },
  });

  const colorValue = watch("color");
  const statusValue = watch("status");
  const descriptionValue = watch("description");

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("icon", file, { shouldValidate: true });

      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveIcon = () => {
    setValue("icon", undefined as any, { shouldValidate: true });
    setIconPreview("");
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (data: CreateActionFormData) => {
    clearError();
    try {
      await createAction(data);
      onSuccess?.();
    } catch (err) {
      console.error("Error al crear acción:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre de la categoría*"
        placeholder="Escribir el nombre de la categoria"
        disabled={isLoading}
        error={errors.name?.message}
        {...register("name")}
      />

      <div>
        <label className="label">Descripción de la categoria*</label>
        <div className="relative">
          <textarea
            placeholder="Agregar descripción"
            rows={3}
            maxLength={100}
            disabled={isLoading}
            className={`input resize-none w-full ${
              errors.description ? "input-error" : ""
            }`}
            {...register("description")}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {descriptionValue?.length || 0}/100
          </div>
        </div>
        {errors.description && (
          <p className="error-text">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="label">Logo*</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          {iconPreview ? (
            <div className="flex items-center gap-3">
              <img
                src={iconPreview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveIcon}
                disabled={isLoading}
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
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-sm text-gray-600 font-medium">
                  Carga archivo
                </span>
              </div>
            </label>
          )}
        </div>
        {errors.icon && <p className="error-text">{errors.icon.message}</p>}
      </div>

      <div>
        <label className="label">Color*</label>
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <input
              type="text"
              placeholder="#00A896"
              maxLength={7}
              disabled={isLoading}
              className={`input ${errors.color ? "input-error" : ""}`}
              {...register("color")}
            />
          </div>
          <input
            type="color"
            value={colorValue}
            onChange={(e) => setValue("color", e.target.value.toUpperCase())}
            disabled={isLoading}
            className="w-11 h-11 rounded-md border-2 border-gray-300 cursor-pointer"
            title="Seleccionar color"
          />
        </div>
        {errors.color && (
          <p className="error-text">{errors.color.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Selecciona un color o ingresa un código HEX
        </p>
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-sm font-medium text-gray-700">Activo</span>
        <button
          type="button"
          onClick={() => setValue("status", statusValue === 1 ? 0 : 1)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            statusValue === 1 ? "bg-brand-primary" : "bg-gray-300"
          }`}
          disabled={isLoading}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              statusValue === 1 ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {error && (
        <div className="bg-status-error/10 border border-status-error rounded-lg p-2.5">
          <p className="text-sm text-status-error text-center">{error}</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
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
            "Crear"
          )}
        </button>
      </div>
    </form>
  );
};