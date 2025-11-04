-- Enable RLS on receipts table
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

-- Enable RLS on receipt_items table  
ALTER TABLE receipt_items ENABLE ROW LEVEL SECURITY;

-- RLS Policy for receipts table - users can only access their own receipts
CREATE POLICY "Users can view their own receipts" ON receipts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own receipts" ON receipts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own receipts" ON receipts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own receipts" ON receipts
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policy for receipt_items table - users can only access items from their own receipts
CREATE POLICY "Users can view their own receipt items" ON receipt_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM receipts 
            WHERE receipts.id = receipt_items.receipt_id 
            AND receipts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert items for their own receipts" ON receipt_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM receipts 
            WHERE receipts.id = receipt_items.receipt_id 
            AND receipts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update items for their own receipts" ON receipt_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM receipts 
            WHERE receipts.id = receipt_items.receipt_id 
            AND receipts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete items for their own receipts" ON receipt_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM receipts 
            WHERE receipts.id = receipt_items.receipt_id 
            AND receipts.user_id = auth.uid()
        )
    );

-- Storage policies for the receipts bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for receipts storage bucket
CREATE POLICY "Users can upload their own receipts" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'receipts' AND 
        auth.uid()::text = (string_to_array(name, '/'))[1]
    );

CREATE POLICY "Users can view their own receipts" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'receipts' AND 
        auth.uid()::text = (string_to_array(name, '/'))[1]
    );

CREATE POLICY "Users can update their own receipts" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'receipts' AND 
        auth.uid()::text = (string_to_array(name, '/'))[1]
    );

CREATE POLICY "Users can delete their own receipts" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'receipts' AND 
        auth.uid()::text = (string_to_array(name, '/'))[1]
    );
