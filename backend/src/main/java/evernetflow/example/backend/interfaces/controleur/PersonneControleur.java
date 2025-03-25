package evernetflow.example.backend.interfaces.controleur;


import evernetflow.example.backend.application.dto.PersonneDto;
import evernetflow.example.backend.interfaces.facade.PersonneFacade;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonneControleur {

    private final PersonneFacade personneFacade;

    public PersonneControleur(PersonneFacade personneFacade) {
        this.personneFacade = personneFacade;
    }
    @GetMapping("/recuperer-les-personnes")
    public List<PersonneDto> recupererLesPersonnes() {
        return personneFacade.recupererLesPersonnes();
    }

    @PostMapping("/ajouter-personne")
    public PersonneDto  ajouterUnePersonne(@RequestBody  PersonneDto personneDto ) {
        return personneFacade.ajouterUnePersonne(personneDto);

    }

    @PutMapping("/modifier-personne/{id}")
    public void  modifierUnePersonne(@RequestBody PersonneDto personneDto, @PathVariable Long id) {
        personneFacade.modifierUnePersonne(personneDto, id);

    }

    @GetMapping("/recuperer-personne/{id}")
    public PersonneDto  recupererUnePersonne(@PathVariable Long id){
        return personneFacade.recupererUnePersonne(id);
    }

    @DeleteMapping("/supprimer-personne/{id}")
    public void supprimerUnePersonne(@PathVariable Long id) {
        personneFacade.supprimerUnePersonne(id);
    }
}
