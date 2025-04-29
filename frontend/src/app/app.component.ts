import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from './services/movie.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
  })
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  currentMovie: Movie = {
    title: '',
    genre: '',
    watched: false,
    rating: 0
  };
  isEditMode: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  saveMovie(): void {
    if (this.isEditMode) {
      this.movieService.updateMovie(this.currentMovie).subscribe(() => {
        this.loadMovies();
        this.resetMovie();
        this.isEditMode = false;
      });
    } else {
      this.movieService.createMovie(this.currentMovie).subscribe(() => {
        this.loadMovies();
        this.resetMovie();
      });
    }
  }

  editMovie(movie: Movie): void {
    this.currentMovie = { ...movie };
    this.isEditMode = true;
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.loadMovies();
      });
    }
  }

  resetMovie(): void {
    this.currentMovie = {
      title: '',
      genre: '',
      watched: false,
      rating: 0
    };
  }
}
