using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using EnterpriseServiceOperations.Plugins;

namespace SlaTargetCalculator.Tests
{
    [TestClass]
    public class SlaTargetCalculatorTests
    {
        [DataTestMethod]
        [DataRow(100000000, 4)]
        [DataRow(100000001, 8)]
        [DataRow(100000002, 24)]
        [DataRow(100000003, 72)]
        public void Calculate_UsesExpectedCalendarHours(int severity, int hours)
        {
            var created = new DateTime(2026, 1, 1, 10, 0, 0, DateTimeKind.Utc);
            var actual = SlaTargetCalculator.Calculate(created, severity);
            Assert.AreEqual(created.AddHours(hours), actual);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void Calculate_RejectsUnknownSeverity()
        {
            SlaTargetCalculator.Calculate(DateTime.UtcNow, 999);
        }
    }
}
