export interface MovieDetails {
    id: string;
    title: string;
    description: string;
    showtime: string;
    availableSeats: number;
    bookedSeats: number;
}

export interface MovieFormProps {
    movie: MovieDetails;
    bookedSeats: number;
    onSave: (newSeats: number) => void;
    onCancel: () => void;
}

export interface MovieTableProps {
    movies:  MovieDetails[];
    onUpdate: (index: number) => void;
    onDelete: (index: number) => void;
    onSubmit: () => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    isUpdate: boolean;
    children: React.ReactNode;
}

export interface MovieCardProps {
    movie: MovieDetails;
    onBook: (movie: MovieDetails) => void;
    onUpdate: (movie: MovieDetails) => void;
    onCancel: (movie: MovieDetails) => void;
}