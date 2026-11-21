import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de grupo: compara dos campos del mismo formulario.
 * Si no coinciden, el grupo queda con el error { contrasenasNoCoinciden: true }.
 */
export function contrasenasCoinciden(campo: string, confirmacion: string): ValidatorFn {
  return (grupo: AbstractControl): ValidationErrors | null => {
    const valor = grupo.get(campo)?.value;
    const valorConfirmacion = grupo.get(confirmacion)?.value;
    if (!valorConfirmacion) {
      return null;
    }
    return valor === valorConfirmacion ? null : { contrasenasNoCoinciden: true };
  };
}
