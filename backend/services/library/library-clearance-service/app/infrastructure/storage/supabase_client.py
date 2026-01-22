class SupabaseStorageClient:
    def upload_certificate(self, student_id: int, content: str) -> str:
        # Stub: replace with real Supabase Storage upload later
        # For now returns a "fake" path that we store as metadata.
        return f"supabase://library-clearance/student-{student_id}.pdf"
