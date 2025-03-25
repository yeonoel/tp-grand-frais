package evernetflow.example.backend.interfaces.facade;

import evernetflow.example.backend.application.dto.DepartementDto;
import evernetflow.example.backend.application.dto.PersonneDto;
import evernetflow.example.backend.domaine.Departement;
import evernetflow.example.backend.domaine.Personne;
import evernetflow.example.backend.exception.ResourceNotFoundException;
import evernetflow.example.backend.infrastructure.repository.DepartementRepository;
import evernetflow.example.backend.infrastructure.repository.PersonneRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DepartementFacade {

    private final DepartementRepository  departementRepository;

    public DepartementFacade(DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;

    }

    /**
    * Recupération de la liste des departements à chaque fois que l'utilisateur
    * fait une recherche dépuis le front dans le champs département
    * @param search element à rechercher
     * @return Liste des dérpartements qui corespondent à la recherche
    * */
    public List<DepartementDto> rechercherParDesignation(String search) {
        return departementRepository.findByDesignationContainingIgnoreCase(search).stream()
                .map(DepartementDto::new)
                .toList();
    }



}
