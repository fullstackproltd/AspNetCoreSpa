
namespace AspNetCoreSpa.Server.Filters
{

	/// <summary>
	/// Object that holds a single Validation Error for the business object
	/// </summary>
	public class ValidationError 
	{		
		/// <summary>
		/// The error message for this validation error.
		/// </summary>
		public string Message { get; set; }
		

		/// <summary>
		/// The name of the field that this error relates to.
		/// </summary>
		public string ControlID { get; set; }
		
		/// <summary>
		/// An ID set for the Error. This ID can be used as a correlation between bus object and UI code.
		/// </summary>
		public string ID { get; set; }
		
		public ValidationError() {}

		public ValidationError(string message, string fieldName = null, string id = null)            
		{
			Message = message;
			ControlID = fieldName;
			ID = id;
		}

	}
}
