package evernetflow.example.backend.application.dto;

import evernetflow.example.backend.domaine.Personne;

public class PersonneDto {

    private Long id;
    private String nom;
    private String prenom;
    private int age;
    private String departement;

    public PersonneDto() {}

    public PersonneDto(String nom, String prenom, int age, String departement) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.departement = departement;
    }

    public PersonneDto(Personne personne) {
        this.id = personne.getId();
        this.nom = personne.getNom();
        this.prenom = personne.getPrenom();
        this.age = personne.getAge();
        this.departement = personne.getDepartement().getDesignation();
    }


    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getDepartement() {
        return departement;
    }
    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

