package evernetflow.example.backend.infrastructure.repository;


import evernetflow.example.backend.domaine.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonneRepository extends JpaRepository<Personne, Long> {
}

