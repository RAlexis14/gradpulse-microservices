class SupabaseStorageClient:
    def upload_certificate(self, student_id: int, content: str) -> str:
        """
        Simulates uploading a clearance certificate to Supabase Storage.
        Returns a fake storage path.
        """
        return f"supabase://library-clearance/student-{student_id}.pdf"
