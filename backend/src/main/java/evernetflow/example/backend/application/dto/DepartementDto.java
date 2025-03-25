package evernetflow.example.backend.application.dto;

import evernetflow.example.backend.domaine.Departement;

public class DepartementDto {

    private String code;
    private String designation;

    public DepartementDto() {
    }

    public DepartementDto(String code, String designation) {
        this.code = code;
        this.designation = designation;
    }

    public DepartementDto(Departement departement) {
        this.code = departement.getCode();
        this.designation = departement.getDesignation();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
