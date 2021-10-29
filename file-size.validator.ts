import { FormGroup } from "@angular/forms";
export function FileSizeValidator(file: File) {
    return (formGroup: FormGroup) => {
        if (file != null) {
            var size = file.size
            console.log(size);
            if (size < (5 * 1024)) {
                return;
            }
        }
        return {'tooBig': true};
    };
}