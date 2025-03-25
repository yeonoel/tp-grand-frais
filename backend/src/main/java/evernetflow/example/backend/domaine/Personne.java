package evernetflow.example.backend.domaine;


import evernetflow.example.backend.application.dto.PersonneDto;
import jakarta.persistence.*;

@Entity
@Table(name = "personne")
public class Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;
    @Column(name = "age")
    private int age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departement_id")
    private Departement departement;

    public Personne() {}

    public Personne(String nom, String prenom, int age) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    public Personne(PersonneDto personneDto, Departement departement) {
        this.nom = personneDto.getNom();
        this.prenom = personneDto.getPrenom();
        this.age = personneDto.getAge();
        this.departement = departement;
    }

    public void modififierPersonne(PersonneDto personneDto, Departement departement) {
        this.nom = personneDto.getNom();
        this.prenom = personneDto.getPrenom();
        this.age = personneDto.getAge();
        this.departement = departement;
    }

    public Departement getDepartement() {
        return departement;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
