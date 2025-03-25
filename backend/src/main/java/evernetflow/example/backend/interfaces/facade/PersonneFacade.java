package evernetflow.example.backend.interfaces.facade;

import evernetflow.example.backend.domaine.Departement;
import evernetflow.example.backend.domaine.Personne;
import evernetflow.example.backend.application.dto.PersonneDto;
import evernetflow.example.backend.exception.ResourceNotFoundException;
import evernetflow.example.backend.infrastructure.repository.DepartementRepository;
import evernetflow.example.backend.infrastructure.repository.PersonneRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PersonneFacade {

    private final PersonneRepository personneRepository;
    private final DepartementRepository  departementRepository;

    public PersonneFacade(PersonneRepository personneRepository, DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
        this.personneRepository = personneRepository;

    }

    /**
     * Récupère toutes les personnes de la base de données.
     * @return Liste de PersonneDto.
     */
    public List<PersonneDto> recupererLesPersonnes() {
        return personneRepository.findAll().stream()
                .map(PersonneDto::new)
                .toList();
    }

    /**
     * Ajoute une nouvelle personne dans la base de données.
     * @param personneDto Objet contenant les informations de la personne à ajouter.
     * @return Un objet PersonneDto.
     */
    @Transactional
    public PersonneDto ajouterUnePersonne(PersonneDto personneDto) {
        verifierChampsObligatoires(personneDto);
        Departement departement = departementRepository.findByDesignation(personneDto.getDepartement());
        if (departement == null) {
            throw new ResourceNotFoundException("Le département " + personneDto.getDepartement() + " n'existe pas");
        }
        Personne nouvellePersonne = new Personne(personneDto, departement);
        Personne personne =  personneRepository.save(nouvellePersonne);
        return new PersonneDto(personne);
    }

    /**
     * Modifie une personne existante dans la base de données.
     * @param personneDto Objet contenant les informations mises à jour de la personne.
     * @param id L'ID de la personne à modifier.
     */
    @Transactional
    public void modifierUnePersonne(PersonneDto personneDto, Long id)  {
        verifierChampsObligatoires(personneDto);
        Personne personne = personneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La personne " + id + " n'existe pas"));

        Departement departement = departementRepository.findByDesignation(personneDto.getDepartement());
        if (departement == null) {
            throw new ResourceNotFoundException("Le département " + personneDto.getDepartement() + " n'existe pas");
        }
        personne.modififierPersonne(personneDto, departement);
    }


    /**
     * Récupère une personne spécifique en fonction de son ID.
     * @param id L'ID de la personne à récupérer.
     * @return L'objet PersonneDto.
     */
    public PersonneDto recupererUnePersonne(Long id) {
        Personne personne = personneRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La personne " + id + " n'existe pas"));
        return new PersonneDto(personne);
    }


    /**
     * Supprime une personne de la base de données.
     * @param id L'ID de la personne à supprimer.
     */
    public void supprimerUnePersonne(Long id)  {
        Optional<Personne> personne = personneRepository.findById(id);
        if (personne.isEmpty()) {
            throw new EntityNotFoundException("Cette personne n'existe pas");
        }
         personneRepository.deleteById(id);
    }


    /**
     * Vérifie que tous les champs obligatoires de l'objet PersonneDto sont renseignés.
     * @param personneDto L'objet contenant les informations de la personne à vérifier.
     */
    private void verifierChampsObligatoires(PersonneDto personneDto) {
        if (personneDto == null) {
            throw new IllegalArgumentException("Les informations de la personne sont requises.");
        }
        if (personneDto.getDepartement() == null || personneDto.getDepartement().trim().isEmpty()) {
            throw new IllegalArgumentException("La département est requis.");
        }
        if (personneDto.getAge() <= 0) {
            throw new IllegalArgumentException("L'âge doit être un nombre positif.");
        }
        if (personneDto.getNom() == null || personneDto.getNom().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom est requis.");
        }
        if (personneDto.getPrenom() == null || personneDto.getPrenom().trim().isEmpty()) {
            throw new IllegalArgumentException("Le prénom est requis.");
        }
    }


}
